import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Download, Receipt, History, HelpCircle } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

const initialInvoices: Invoice[] = [
  { id: "1", date: "2025-07-28", amount: "29 €", status: "Paid" },
  { id: "2", date: "2025-06-28", amount: "29 €", status: "Paid" },
  { id: "3", date: "2025-05-28", amount: "29 €", status: "Paid" },
  { id: "4", date: "2025-04-28", amount: "29 €", status: "Paid" },
];

export function ManageBilling() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const { toast } = useToast();

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      toast({
        title: "Download Initiated",
        description: `Downloading invoice #${invoice.id} for ${invoice.date}.`,
      });
      // Logic for actual download would go here
    }
  };

  const handleUpdatePaymentMethod = () => {
    toast({
      title: "Update Payment",
      description: "Redirecting you to the secure payment portal...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Billing & Payments</h2>
        <p className="text-muted-foreground">
          View your payment history, download invoices, and manage your billing information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Your current payment method on file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 09/2027</p>
            </div>
            <Button variant="secondary" onClick={handleUpdatePaymentMethod}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payment History
          </CardTitle>
          <CardDescription>
            A list of your past invoices and transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">#{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${invoice.status === "Paid" ? "bg-green-500" : "bg-yellow-500"}`} />
                      <span className="text-sm">{invoice.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Need help?
          </CardTitle>
          <CardDescription>
            For any billing questions or issues, please contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
}