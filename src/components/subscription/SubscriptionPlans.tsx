import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Check, 
  X, 
  Star, 
  Users, 
  Database, 
  Zap, 
  Shield, 
  Headphones, 
  Crown,
  TrendingUp,
  Calendar,
  CreditCard,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  popular?: boolean;
  current?: boolean;
  features: PlanFeature[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: { monthly: 0, annual: 0 },
    current: true,
    features: [
      { name: 'Up to 5 team members', included: true },
      { name: '3 projects', included: true },
      { name: '1GB storage', included: true },
      { name: 'Basic kanban boards', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced analytics', included: false },
      { name: 'Custom workflows', included: false },
      { name: 'API access', included: false },
      { name: 'Priority support', included: false }
    ],
    icon: Users,
    color: 'text-blue-500'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing teams that need more power',
    price: { monthly: 29, annual: 290 },
    popular: true,
    features: [
      { name: 'Up to 25 team members', included: true },
      { name: 'Unlimited projects', included: true },
      { name: '50GB storage', included: true },
      { name: 'Advanced kanban boards', included: true },
      { name: 'Priority email support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom workflows', included: true },
      { name: 'Basic API access', included: true },
      { name: '24/7 support', included: false }
    ],
    icon: Zap,
    color: 'text-purple-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: { monthly: 99, annual: 990 },
    features: [
      { name: 'Unlimited team members', included: true },
      { name: 'Unlimited projects', included: true },
      { name: '500GB storage', included: true },
      { name: 'Advanced kanban boards', included: true },
      { name: 'Dedicated support manager', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom workflows', included: true },
      { name: 'Full API access', included: true },
      { name: '24/7 priority support', included: true }
    ],
    icon: Crown,
    color: 'text-yellow-500'
  }
];

const usageStats = {
  members: { current: 3, limit: 5 },
  projects: { current: 2, limit: 3 },
  storage: { current: 0.7, limit: 1 }, // GB
};

export function SubscriptionPlans() {
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

  const currentPlan = plans.find(plan => plan.current);

  const handleUpgrade = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsUpgradeDialogOpen(true);
  };

  const confirmUpgrade = () => {
    if (selectedPlan) {
      toast({
        title: "Upgrade initiated",
        description: `Successfully upgraded to ${selectedPlan.name} plan.`,
      });
      setIsUpgradeDialogOpen(false);
      setSelectedPlan(null);
    }
  };

  const calculateProgress = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${(gb * 1000).toFixed(0)}MB`;
    }
    return `${gb.toFixed(1)}GB`;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Scale your team's productivity with the right plan for your needs
        </p>
        
        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="plans" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              const price = isAnnual ? plan.price.annual : plan.price.monthly;
              const savings = plan.price.monthly * 12 - plan.price.annual;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative transition-all duration-200 hover:shadow-lg ${
                    plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                  } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  {plan.current && (
                    <div className="absolute -top-3 right-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Current Plan
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <IconComponent className={`h-8 w-8 ${plan.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold">
                        ${price}
                        <span className="text-lg font-normal text-muted-foreground">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && plan.price.annual > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          Save ${savings} per year
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      {plan.current ? (
                        <Button className="w-full" variant="outline" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          variant={plan.popular ? "default" : "outline"}
                          onClick={() => handleUpgrade(plan)}
                        >
                          {price === 0 ? 'Downgrade' : 'Upgrade'} to {plan.name}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Usage
              </CardTitle>
              <CardDescription>
                Monitor your plan usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Members */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Team Members</span>
                  <span className="text-sm text-muted-foreground">
                    {usageStats.members.current} / {usageStats.members.limit}
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(usageStats.members.current, usageStats.members.limit)} 
                  className="h-2"
                />
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Projects</span>
                  <span className="text-sm text-muted-foreground">
                    {usageStats.projects.current} / {usageStats.projects.limit}
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(usageStats.projects.current, usageStats.projects.limit)} 
                  className="h-2"
                />
              </div>

              {/* Storage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-muted-foreground">
                    {formatStorage(usageStats.storage.current)} / {formatStorage(usageStats.storage.limit)}
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(usageStats.storage.current, usageStats.storage.limit)} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Plan Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium">{currentPlan?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="font-medium">Monthly</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Billing Date</p>
                  <p className="font-medium">March 15, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Address</p>
                  <p className="font-medium">123 Business St</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
                </div>
                <Button variant="outline" size="sm">
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Next Bill */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Next Bill
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount Due</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">March 15, 2024</p>
                </div>
                <Badge variant="secondary">Free Plan</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No billing history available</p>
                <p className="text-sm">You're currently on the free plan</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upgrade Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              {selectedPlan && (
                <>
                  You're about to upgrade to the {selectedPlan.name} plan.
                  {selectedPlan.price.monthly > 0 && (
                    <span>
                      {' '}Your card will be charged ${isAnnual ? selectedPlan.price.annual : selectedPlan.price.monthly} 
                      {isAnnual ? ' annually' : ' monthly'}.
                    </span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpgrade}>
              Confirm Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}