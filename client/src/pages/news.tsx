import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, LogOut, ExternalLink, Newspaper, Clock, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDistance } from "date-fns";
import newsBackgroundImage from "@assets/stock_images/african_business_fin_fb5b7fcc.jpg";

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  language: string;
  country: string;
  imageUrl: string | null;
}

export default function News() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const { data, isLoading } = useQuery<{ articles: NewsArticle[] }>({
    queryKey: ["/api/news"],
    refetchInterval: 5 * 60 * 1000,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/logout", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "Unable to log out. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatPublishedDate = (dateString: string) => {
    try {
      const date = new Date(dateString.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <Badge variant="secondary" className="text-sm" data-testid="text-user-balance">
                    ${parseFloat(user.balance).toFixed(2)}
                  </Badge>
                  <span className="text-sm font-medium" data-testid="text-username">{user.username}</span>
                </>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logoutMutation.mutate()}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div 
              className="relative min-h-[400px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${newsBackgroundImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
              
              <div className="relative max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <Newspaper className="h-10 w-10" />
                      <h1 className="text-4xl font-semibold font-heading">African Financial News</h1>
                    </div>
                    <p className="text-white/80 text-lg">
                      Stay updated with the latest financial market news across Africa
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    data-testid="button-back-home"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-2xl font-bold">{data?.articles.length || 0}</p>
                          <p className="text-sm text-white/70">Latest Articles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-8 w-8 text-green-400" />
                        <div>
                          <p className="text-2xl font-bold">Live</p>
                          <p className="text-sm text-white/70">Real-time Updates</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Newspaper className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="text-2xl font-bold">54</p>
                          <p className="text-sm text-white/70">African Countries</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="rounded-xl">
                      <CardHeader>
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-40 w-full mb-4" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-5/6" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : data?.articles && data.articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {data.articles.map((article, index) => (
                    <Card 
                      key={index} 
                      className="rounded-xl hover-elevate active-elevate-2 overflow-hidden group cursor-pointer"
                      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                      data-testid={`card-news-${index}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {article.source}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatPublishedDate(article.publishedAt)}
                          </div>
                        </div>
                        <CardTitle className="text-base line-clamp-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {article.imageUrl && (
                          <div className="mb-3 rounded-lg overflow-hidden">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            <span className="uppercase">{article.country}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(article.url, '_blank', 'noopener,noreferrer');
                            }}
                            data-testid={`button-read-more-${index}`}
                          >
                            Read More
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>No News Available</CardTitle>
                    <CardDescription>
                      Unable to fetch news at this time. Please try again later.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
