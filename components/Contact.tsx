"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useTranslation } from "../hooks/useTranslation"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function Contact() {
  const { t } = useTranslation()
  const { data } = usePortfolioData()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Using EmailJS for form submission
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const contactInfo = data?.contact || []

  return (
    <section id="contato" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">{t("contact.title")}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">{t("contact.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <h3 className="text-xl md:text-2xl mb-4 md:mb-6 font-semibold">{t("contact.letsChat")}</h3>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">{t("contact.description")}</p>

              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 md:gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex-shrink-0">
                      {info.type === "email" && <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                      {info.type === "phone" && <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                      {info.type === "location" && <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm md:text-base">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg md:text-xl">{t("contact.sendMessage")}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{t("contact.formDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">
                        {t("contact.name")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.namePlaceholder")}
                        required
                        disabled={isSubmitting}
                        className="h-10 md:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">
                        {t("contact.email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("contact.emailPlaceholder")}
                        required
                        disabled={isSubmitting}
                        className="h-10 md:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm md:text-base">
                        {t("contact.message")}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("contact.messagePlaceholder")}
                        rows={4}
                        required
                        disabled={isSubmitting}
                        className="resize-none"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">{t("contact.successMessage")}</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{t("contact.errorMessage")}</span>
                      </div>
                    )}

                    <Button type="submit" className="w-full h-10 md:h-11" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("contact.sendButton")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
