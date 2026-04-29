import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetRecommendations, UserProfile } from "@workspace/api-client-react";
import { useProfileStore } from "@/lib/storage";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";

// Using exact types from API
const formSchema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().min(0).max(120),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.enum(["student", "salaried", "self_employed", "farmer", "unemployed", "homemaker", "retired", "daily_wage"]),
  income: z.coerce.number().min(0),
  state: z.string().min(1, "State is required"),
  education: z.enum(["none", "primary", "secondary", "higher_secondary", "graduate", "postgraduate"]),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  differentlyAbled: z.boolean().default(false).optional(),
  hasAadhaar: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  hasPAN: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  hasVoterId: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  hasRationCard: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  hasDrivingLicense: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  hasBankAccount: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
});

type FormValues = z.infer<typeof formSchema>;

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function Profile() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [savedProfile, setSavedProfile] = useProfileStore();
  
  const getRecommendations = useGetRecommendations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: savedProfile || {
      name: "",
      age: 25,
      gender: "other",
      occupation: "unemployed",
      income: 0,
      state: "",
      education: "none",
      maritalStatus: "single",
      differentlyAbled: false,
      hasAadhaar: undefined,
      hasPAN: undefined,
      hasVoterId: undefined,
      hasRationCard: undefined,
      hasDrivingLicense: undefined,
      hasBankAccount: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Save profile locally
    setSavedProfile(data as UserProfile);
    
    // API Call
    try {
      await getRecommendations.mutateAsync({ data: data as UserProfile });
      setLocation("/results");
    } catch (e) {
      console.error(e);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["age", "gender", "maritalStatus", "education", "state"];
    if (step === 2) fieldsToValidate = ["occupation", "income"];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setStep((s) => Math.min(s + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepTitle = [
    t("profile.step1"),
    t("profile.step2"),
    t("profile.step3")
  ][step - 1];

  return (
    <div className="min-h-screen w-full bg-muted/10 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-center">{t("profile.title")}</h1>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>{stepTitle}</span>
              <span>Step {step} of 3</span>
            </div>
            <Progress value={(step / 3) * 100} className="h-2" />
          </div>
        </div>

        <Card className="border-border/50 shadow-sm backdrop-blur-sm bg-background/95">
          <CardHeader>
            <CardTitle className="text-xl">{stepTitle}</CardTitle>
            <CardDescription>Tell us about yourself to get accurate recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* STEP 1: PERSONAL */}
                    {step === 1 && (
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("profile.fields.name")}</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-muted/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("profile.fields.age")}</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} className="bg-muted/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("profile.fields.gender")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/50">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">{t("profile.options.male")}</SelectItem>
                                    <SelectItem value="female">{t("profile.options.female")}</SelectItem>
                                    <SelectItem value="other">{t("profile.options.other")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="maritalStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("profile.fields.maritalStatus")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/50">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="single">{t("profile.options.single")}</SelectItem>
                                    <SelectItem value="married">{t("profile.options.married")}</SelectItem>
                                    <SelectItem value="divorced">{t("profile.options.divorced")}</SelectItem>
                                    <SelectItem value="widowed">{t("profile.options.widowed")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("profile.fields.education")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/50">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="none">{t("profile.options.none")}</SelectItem>
                                    <SelectItem value="primary">{t("profile.options.primary")}</SelectItem>
                                    <SelectItem value="secondary">{t("profile.options.secondary")}</SelectItem>
                                    <SelectItem value="higher_secondary">{t("profile.options.higher_secondary")}</SelectItem>
                                    <SelectItem value="graduate">{t("profile.options.graduate")}</SelectItem>
                                    <SelectItem value="postgraduate">{t("profile.options.postgraduate")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("profile.fields.state")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-muted/50">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {STATES.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="differentlyAbled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 bg-muted/20">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{t("profile.fields.differentlyAbled")}</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* STEP 2: FINANCIAL */}
                    {step === 2 && (
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>{t("profile.fields.occupation")}</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                  {[
                                    "student", "salaried", "self_employed", "farmer",
                                    "unemployed", "homemaker", "retired", "daily_wage"
                                  ].map((occ) => (
                                    <FormItem key={occ} className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border bg-muted/20 cursor-pointer hover:bg-muted/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                      <FormControl>
                                        <RadioGroupItem value={occ} />
                                      </FormControl>
                                      <FormLabel className="font-normal w-full cursor-pointer">
                                        {t(`profile.options.${occ}`)}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="income"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("profile.fields.income")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                                  <Input type="number" {...field} className="pl-8 bg-muted/50 text-lg font-medium" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* STEP 3: DOCUMENTS */}
                    {step === 3 && (
                      <div className="grid gap-4">
                        {[
                          { name: "hasAadhaar", label: "hasAadhaar" },
                          { name: "hasPAN", label: "hasPAN" },
                          { name: "hasVoterId", label: "hasVoterId" },
                          { name: "hasRationCard", label: "hasRationCard" },
                          { name: "hasDrivingLicense", label: "hasDrivingLicense" },
                          { name: "hasBankAccount", label: "hasBankAccount" },
                        ].map((doc) => (
                          <FormField
                            key={doc.name}
                            control={form.control}
                            name={doc.name as keyof FormValues}
                            render={({ field }) => (
                              <FormItem className="flex flex-col gap-2 rounded-xl border p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex flex-row items-center justify-between">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base font-medium">
                                      {t(`profile.fields.${doc.label}`)}
                                    </FormLabel>
                                  </div>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={(field.value as string) ?? ""}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id={`${doc.name}-yes`} />
                                        <FormLabel htmlFor={`${doc.name}-yes`} className="font-normal">{t("profile.options.yes")}</FormLabel>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id={`${doc.name}-no`} />
                                        <FormLabel htmlFor={`${doc.name}-no`} className="font-normal">{t("profile.options.no")}</FormLabel>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-6 border-t">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t("profile.back")}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      {t("profile.next")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={getRecommendations.isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {getRecommendations.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {t("profile.submit")}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
