import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  projectName: z.string().nonempty(),
  projectSubdomain: z.string().nonempty(),
  framework: z.string().nonempty(),

  repository: z
    .object({
      url: z.string().url(),
      name: z.string().nonempty(), // e.g. livekit
      namespace: z.string().nonempty(), // e.g. acerohernan/livekit
      branch: z.string().nonempty(),
    })
    .strict(),

  buildSettings: z
    .object({
      rootDirectory: z.string().nonempty(),
      buildCommand: z.string().nonempty(),
      outputDir: z.string().nonempty(),
      installCommand: z.string().nonempty(),
    })
    .strict(),

  env: z.array(
    z
      .object({
        key: z.string().nonempty(),
        value: z.string().nonempty(),
      })
      .strict(),
  ),
});

type Form = z.infer<typeof formSchema>;

export const ConfigureProjectCard = () => {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      framework: "vite",
      buildSettings: {
        buildCommand: "'npm run build' or 'vite build'",
        rootDirectory: "apps/web",
        outputDir: "dist",
        installCommand: "'yarn install' or 'pnpm install'",
      },
    },
  });

  function onSubmit(values: Form) {
    console.log(values);
  }

  return (
    <Card className="w-full mx-auto bg-background">
      <CardHeader>
        <CardTitle className="font-medium pb-4">Configure Project</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="my-project" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="framework"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Framework Preset</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your framework preset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vite">Vite</SelectItem>
                      <SelectItem value="webpack">Webpack</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildSettings.rootDirectory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Root Directory</FormLabel>
                  <FormControl>
                    <Input placeholder="my-project" {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid gap-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Build and Output Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 my-4 px-1">
                      <FormField
                        control={form.control}
                        name="buildSettings.buildCommand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Build Command</FormLabel>
                            <FormControl>
                              <Input placeholder="my-project" {...field} disabled />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="buildSettings.outputDir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Output Directory</FormLabel>
                            <FormControl>
                              <Input placeholder="my-project" {...field} disabled />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="buildSettings.installCommand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Install Command</FormLabel>
                            <FormControl>
                              <Input placeholder="my-project" {...field} disabled />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Environment Variables</AccordionTrigger>
                  <AccordionContent>
                    <div className="my-4 px-1">
                      <div className="grid gap-4 grid-cols-2">
                        <FormItem>
                          <FormLabel>Key</FormLabel>
                          <FormControl>
                            <Input placeholder="EXAMPLE_NAME" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input placeholder="19JUN23F394R6HH" />
                          </FormControl>
                        </FormItem>
                      </div>
                      <Button variant="secondary" type="button" className="w-full mt-4">
                        Add
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Button type="submit" className="mt-2">
              Deploy
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
