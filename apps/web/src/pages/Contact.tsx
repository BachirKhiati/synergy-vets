import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please provide a valid email"),
  company: z.string().optional(),
  interest: z.string().min(1, "Select the type of enquiry"),
  message: z.string().min(10, "Share a little more detail"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactDetails = [
  {
    icon: Phone,
    title: "Call us",
    value: "01395 200 189",
    description: "Speak directly with a veterinary recruitment specialist.",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@synergyvets.com",
    description: "Share role briefs, CVs, or general enquiries any time.",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "21A Rolle Street, Exmouth, Devon, EX8 1HA",
    description: "Registered in England No: 6837709",
  },
  {
    icon: Clock,
    title: "Fax",
    value: "0870 755 9936",
    description: "Send us documents via fax.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("Contact submission", values);
    toast({
      title: "Message received",
      description: "A consultant will be in touch within one business day.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-card via-background to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">Get in touch</Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
                Let’s build veterinary careers and teams together
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Share your enquiry and our consultants will connect with tailored support for candidates, clinics, and partners.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="details">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <Card key={detail.title} className="border-border/60 bg-card/80 backdrop-blur">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <detail.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wide">{detail.title}</p>
                        <CardTitle className="text-xl text-foreground mt-1">{detail.value}</CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                          {detail.description}
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-border/80 bg-background/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Send us a message</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete the form and we will reach out with next steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@clinic.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic or organisation</FormLabel>
                            <FormControl>
                              <Input placeholder="Synergy Veterinary Hospital" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What can we help with?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an enquiry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="candidate">I’m looking for a new role</SelectItem>
                                <SelectItem value="employer">I want to hire talent</SelectItem>
                                <SelectItem value="partnership">Partnership or media enquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder="Share role details, preferred regions, or any questions." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" variant="hero" size="lg" className="w-full">
                        Send message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
