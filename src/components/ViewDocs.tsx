import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Key, Link } from "lucide-react";

export function ViewDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Documentation</h2>
        <p className="text-muted-foreground">
          Explore our API to integrate your own applications with your workspace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Getting Started
          </CardTitle>
          <CardDescription>
            Learn the basics of our API and how to make your first request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our API is a RESTful API that allows you to interact with your workspace data programmatically. All API calls are made over HTTPS and are authenticated with an API key.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">Base URL</h4>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              https://api.company.com/v1
            </code>
          </div>
          <Button variant="secondary" className="mt-4" onClick={() => window.open('https://docs.company.com/api', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Documentation
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Authentication
          </CardTitle>
          <CardDescription>
            Authenticate your requests using your API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Include your API key in the `Authorization` header of your requests.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm">
            {`curl -X GET \\
  https://api.company.com/v1/users \\
  -H 'Authorization: Bearer sk_live_your_api_key'`}
          </pre>
          <p className="text-sm text-muted-foreground">
            Find your API keys in the <a href="#" className="underline font-medium">Connect settings</a>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            API Endpoints
          </CardTitle>
          <CardDescription>
            A quick reference for the most common endpoints.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><code className="font-semibold">GET /users</code> - Retrieve a list of users.</li>
            <li><code className="font-semibold">POST /documents</code> - Create a new document.</li>
            <li><code className="font-semibold">DELETE /documents/:id</code> - Delete a specific document.</li>
            <li><code className="font-semibold">GET /projects/:id/members</code> - Get members of a project.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}