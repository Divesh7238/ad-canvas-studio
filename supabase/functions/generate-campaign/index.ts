import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, platform, brandTone, ctaText } = await req.json();

    console.log('Generating campaign for prompt:', prompt);
    console.log('Platform:', platform, 'Tone:', brandTone);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Generate enhanced prompt and marketing copy using AI
    const copyResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert marketing copywriter. Generate compelling ad copy for social media campaigns. 
            
Your response must be valid JSON with this exact structure:
{
  "enhancedPrompt": "A detailed, visual description for image generation",
  "caption": "The marketing caption (2-3 sentences max)",
  "hashtags": ["#Hashtag1", "#Hashtag2", "#Hashtag3", "#Hashtag4", "#Hashtag5"]
}

Brand tone: ${brandTone}
Platform: ${platform}
CTA: ${ctaText}

Make the caption engaging and conversion-focused. The enhanced prompt should be highly visual and suitable for AI image generation.`
          },
          {
            role: 'user',
            content: `Create marketing content for this campaign: "${prompt}"`
          }
        ],
      }),
    });

    if (!copyResponse.ok) {
      const errorText = await copyResponse.text();
      console.error('AI API error:', copyResponse.status, errorText);
      
      if (copyResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (copyResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('Failed to generate marketing copy');
    }

    const copyData = await copyResponse.json();
    const aiContent = copyData.choices?.[0]?.message?.content || '';
    
    console.log('AI Response:', aiContent);

    // Parse the JSON response
    let parsedContent;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response, using fallback:', parseError);
      parsedContent = {
        enhancedPrompt: `Professional marketing visual for: ${prompt}. High-quality, modern design with clean aesthetics.`,
        caption: `Discover something amazing! ${prompt}. ${ctaText} today!`,
        hashtags: ['#Marketing', '#Brand', '#Success', '#Growth', '#Business']
      };
    }

    // Generate image using the image generation model
    let imageBase64 = null;
    try {
      console.log('Generating image with prompt:', parsedContent.enhancedPrompt);
      
      const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image',
          messages: [
            {
              role: 'user',
              content: `Create a professional marketing advertisement image: ${parsedContent.enhancedPrompt}. Style: Clean, modern, professional marketing material suitable for ${platform}. High quality, visually appealing.`
            }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (imageUrl) {
          imageBase64 = imageUrl;
          console.log('Image generated successfully');
        }
      } else {
        console.error('Image generation failed:', await imageResponse.text());
      }
    } catch (imgError) {
      console.error('Image generation error:', imgError);
    }

    // Use a fallback image if generation failed
    const finalImageUrl = imageBase64 || `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop`;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          enhancedPrompt: parsedContent.enhancedPrompt,
          caption: parsedContent.caption,
          hashtags: parsedContent.hashtags,
          imageUrl: finalImageUrl,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating campaign:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to generate campaign' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
