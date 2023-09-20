import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { useGitRepository } from "@/hooks/query/useGitRepository";
import { CreateProjectShema, ICreateProjectFormValues } from "@/api/project/schemas";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/api";
import { useToast } from "@/components/ui/use-toast";

export const ConfigureProjectCard = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const repoUrl = params.get("url");

  if (!repoUrl) return null;

  const { data: repo } = useGitRepository({ repoUrl });

  if (!repo) return null;

  const mutation = useMutation({
    mutationFn: (form: ICreateProjectFormValues) => API.project.createProject(form),
    onError: () => {
      toast({
        title: "Error at creating project",
        description: "Please try again later or contact the developer!",
        variant: "destructive",
      });
    },
    onSuccess: (data, variables) => {
      const { deploymentId } = data.data;
      const { projectName } = variables;

      if (!deploymentId)
        return toast({
          title: "Error at creating project",
          description: "Deployment id not found in api response! Contact the developer!",
          variant: "destructive",
        });

      navigate(`projects/${projectName}/deployments/${deploymentId}`);
    },
  });

  const form = useForm<ICreateProjectFormValues>({
    resolver: zodResolver(CreateProjectShema),
    defaultValues: {
      projectName: repo.name,
      framework: "react",
      projectSubdomain: repo.name,
      repository: {
        branch: repo.default_branch,
        name: repo.name,
        namespace: repo.full_name,
        url: repo.url,
      },
      buildSettings: {
        buildCommand: "pnpm build",
        rootDirectory: "apps/web",
        outputDir: "dist",
        installCommand: "pnpm install",
      },
      env: [],
    },
  });

  function onSubmit(form: ICreateProjectFormValues) {
    mutation.mutate(form);
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
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vite">Vite</SelectItem>
                      <SelectItem value="webpack">Webpack</SelectItem>
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
                    <Input placeholder="my-project" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid gap-4">
              <Accordion type="multiple">
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
                              <Input placeholder="my-project" {...field} />
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
                              <Input placeholder="my-project" {...field} />
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
                              <Input placeholder="my-project" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
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
            <Button type="submit" className="mt-2" disabled={mutation.isLoading}>
              Deploy
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
