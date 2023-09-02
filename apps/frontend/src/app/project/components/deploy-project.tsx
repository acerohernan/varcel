import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const DeployProjectCard = () => {
  return (
    <Card className="w-full mx-auto bg-background opacity-50">
      <CardHeader>
        <CardTitle className="font-medium pb-4">Deploy</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div>
          <span className="text-sm text-muted-foreground">Preparing deployment...</span>
          <div className="grid gap-4 mt-4 mb-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Building</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>Deployment summary</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>Running checks</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>Assigning Domains</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button variant="destructive" className="w-full">
            Cancel deployment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
