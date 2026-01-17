import { useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AIInsightsButtonProps {
  chartTitle: string;
  chartData: any[];
  chartType: "line" | "bar" | "mixed";
  contextDescription?: string;
}

export function AIInsightsButton({ 
  chartTitle, 
  chartData, 
  chartType,
  contextDescription 
}: AIInsightsButtonProps) {
  const [open, setOpen] = useState(false);
  const [insights, setInsights] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const generateInsights = async () => {
    setLoading(true);
    setError("");
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        setError("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
        setLoading(false);
        return;
      }

      // Prepare data summary
      const dataSummary = JSON.stringify(chartData, null, 2);
      
      const prompt = `Analyze this trade data for HPCL. Provide ONLY the analysis sections below with NO introductory text, NO titles like "Analysis:", NO conclusions. Be direct and concise.

Chart: ${chartTitle}
${contextDescription ? `Context: ${contextDescription}` : ''}
Data: ${dataSummary}

Format your response EXACTLY as:

**Key Trends**
- [2-3 concise bullet points, max 20 words each]

**Notable Patterns**
- [1-2 concise observations, max 20 words each]

**Recommendations**
- [2-3 actionable items, max 20 words each]

Keep all points brief and business-focused. NO extra text.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text || "No insights generated.";
      setInsights(generatedText);
    } catch (err) {
      console.error("Error generating insights:", err);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setOpen(true);
    if (!insights && !loading) {
      generateInsights();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-full hover:bg-accent/50 group"
        onClick={handleClick}
      >
        <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card text-card-foreground border-border z-[9999]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights: {chartTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Generated analysis powered by Gemini AI
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Analyzing chart data...</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {insights && !loading && (
              <div className="max-w-none">
                <div className="p-6 bg-muted/30 rounded-lg border border-border">
                  <div 
                    className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground [&_ul]:text-foreground [&_li]:text-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: insights
                        // Convert horizontal rules
                        .replace(/^---+$/gm, '<hr class="my-4 border-t border-border" />')
                        // Convert headers
                        .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold mt-3 mb-2 text-foreground">$3</h3>')
                        // Convert bold and italic
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        // Convert bullet points (- or *)
                        .replace(/^[\*\-]\s+(.+)$/gim, '<li class="ml-4 mb-1.5">$1</li>')
                        // Convert numbered lists
                        .replace(/^(\d+)\.\s+(.+)$/gim, '<li class="ml-4 mb-1.5 text-foreground"><strong class="text-primary">$1.</strong> $2</li>')
                        // Wrap consecutive <li> tags in <ul>
                        .replace(/(<li[^>]*>.*?<\/li>(\s*<li[^>]*>.*?<\/li>)*)/gs, '<ul class="list-disc ml-6 mb-4 space-y-1 text-foreground">$1</ul>')
                        // Convert double line breaks to paragraphs
                        .replace(/\n\n+/g, '</p><p class="mb-3 text-foreground">')
                        // Wrap remaining text in paragraphs
                        .replace(/^(?!<[h|u|l|p|hr])(.*\S.*)$/gim, '<p class="mb-3 text-foreground">$1</p>')
                        // Clean up empty paragraphs
                        .replace(/<p[^>]*>\s*<\/p>/g, '')
                    }} 
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateInsights}
                    disabled={loading}
                    className="border-border hover:bg-accent"
                  >
                    Regenerate Insights
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
