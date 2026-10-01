"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from '@/hooks/use-toast'


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  serviceInterest: z.string().optional(),
  projectStage: z.string().optional(),
  existingMaterials: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      serviceInterest: "",
      projectStage: "",
      existingMaterials: "",
      message: ""
    }
  })
  const { setValue } = form

  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get('service')
    if (service === 'fpga-asic') {
      setValue('serviceInterest', 'FPGA / SoC / ASIC engineering')
    }
  }, [setValue])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      const projectContext = [
        values.serviceInterest ? `Project area: ${values.serviceInterest}` : '',
        values.projectStage ? `Current stage: ${values.projectStage}` : '',
        values.existingMaterials ? `Existing materials: ${values.existingMaterials}` : '',
      ].filter(Boolean).join('\n')
      const message = [projectContext, values.message].filter(Boolean).join('\n\n')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          organization: values.organization,
          email: values.email,
          message,
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll get back to you soon.",
        })
        form.reset()
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg shadow-md p-8"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Your company or organization" {...field} />
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
                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-primary">Project details <span className="text-sm font-normal text-slate-500">(optional)</span></h3>
            <p className="mt-1 text-sm text-slate-600">These details help us understand technical enquiries. Leave them blank if they are not relevant.</p>
          </div>

          <FormField
            control={form.control}
            name="serviceInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What area is your enquiry about?</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Choose if known</option>
                    <option value="FPGA / SoC / ASIC engineering">FPGA, SoC or ASIC engineering</option>
                    <option value="FPGA design or prototype">FPGA design or prototype</option>
                    <option value="SoC integration">SoC integration</option>
                    <option value="ASIC digital design">ASIC digital design</option>
                    <option value="Not sure yet">Not sure yet</option>
                    <option value="Other / general enquiry">Other / general enquiry</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you in the project?</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Choose if known</option>
                    <option value="Early idea or requirements">Early idea or requirements</option>
                    <option value="Architecture">Architecture</option>
                    <option value="RTL or IP in progress">RTL or IP in progress</option>
                    <option value="FPGA board prototype">FPGA board prototype</option>
                    <option value="ASIC digital design planning">ASIC digital design planning</option>
                    <option value="Other / unsure">Other / unsure</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="existingMaterials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you already have?</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Choose if relevant</option>
                    <option value="Starting from scratch">Starting from scratch</option>
                    <option value="Requirements or architecture documents">Requirements or architecture documents</option>
                    <option value="Existing RTL or IP">Existing RTL or IP</option>
                    <option value="FPGA prototype or hardware">FPGA prototype or hardware</option>
                    <option value="Other / unsure">Other / unsure</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project or inquiry" 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default ContactForm
