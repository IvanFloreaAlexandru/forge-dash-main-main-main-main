import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Euro, BarChart2, Users, HardDrive, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "9 €/mo",
    features: [
      "10 active users",
      "5 GB storage",
      "Standard support",
      "Basic reporting"
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "29 €/mo",
    features: [
      "Unlimited users",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom integrations"
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "SAML/SSO",
      "On-premise deployment",
      "Custom security policies"
    ],
  },
];

export function ChangeSubscription() {
  const [currentPlan, setCurrentPlan] = useState<Plan>(plans[1]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleConfirmChange = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      setIsDialogOpen(false);
      toast({
        title: "Subscription Updated",
        description: `Your plan has been successfully changed to ${selectedPlan.name}.`,
      });
    }
  };

  const isCurrentPlan = (planId: string) => currentPlan.id === planId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Change Subscription</h2>
        <p className="text-muted-foreground">
          Manage your workspace's subscription plan, view billing history, and update payment information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the **{currentPlan.name}** plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold">{currentPlan.price.split('/')[0]}</span>
              <span className="text-muted-foreground">{currentPlan.price.split('/')[1] || ''}</span>
            </div>
            {currentPlan.id !== "enterprise" && (
              <Button variant="secondary">Manage Billing</Button>
            )}
          </div>
          <Separator />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold tracking-tight mb-4">Choose a New Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={isCurrentPlan(plan.id) ? "border-primary border-2" : ""}>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription className="text-3xl font-bold">
                  {plan.price === "Contact Us" ? (
                    <span className="text-base font-normal">Contact Us</span>
                  ) : (
                    <>
                      <span>{plan.price.split('/')[0]}</span>
                      <span className="text-sm font-normal text-muted-foreground">/{plan.price.split('/')[1]}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrentPlan(plan.id)}
                >
                  {isCurrentPlan(plan.id) ? "Current Plan" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change your subscription to the **{selectedPlan?.name}** plan? This will take effect immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmChange}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}