"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Loader2, CheckCircle } from "lucide-react"
import type { CertificateData } from "@/app/generator/page"

interface CertificateFormProps {
  onSubmit: (data: CertificateData) => void
  initialCategory?: string
}

export function CertificateForm({ onSubmit, initialCategory }: CertificateFormProps) {
  const [formData, setFormData] = useState<CertificateData>({
    recipientName: "",
    category: initialCategory || "academic",
    title: "",
    institution: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    instructor: "",
    template: "classic",
    logo: undefined,
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { value: "academic", label: "Academic Achievement" },
    { value: "professional", label: "Professional Training" },
    { value: "sports", label: "Sports & Recreation" },
    { value: "community", label: "Community Service" },
    { value: "workshop", label: "Workshop Participation" },
  ]

  const templates = [
    { value: "classic", label: "Classic Elegant" },
    { value: "modern", label: "Modern Minimal" },
    { value: "formal", label: "Formal Traditional" },
    { value: "creative", label: "Creative Design" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const updateField = (field: keyof CertificateData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file (PNG, JPG, GIF, etc.)")
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB")
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLogoPreview(result)
        setFormData((prev) => ({ ...prev, logo: result }))
        setIsUploading(false)
      }
      reader.onerror = () => {
        setUploadError("Failed to read file")
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed")
      setIsUploading(false)
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setFormData((prev) => ({ ...prev, logo: undefined }))
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Recipient Name *</Label>
          <Input
            id="recipientName"
            value={formData.recipientName}
            onChange={(e) => updateField("recipientName", e.target.value)}
            placeholder="Enter recipient's full name"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Certificate Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g., Certificate of Completion, Achievement Award"
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="institution">Institution/Organization *</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) => updateField("institution", e.target.value)}
            placeholder="University/Organization Name"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Institution/Company Logo (Optional)</Label>
        <div className="space-y-4">
          {!logoPreview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/10">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
                disabled={isUploading}
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isUploading ? "Uploading..." : "Click to upload logo or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="relative inline-block animate-in fade-in duration-300">
              <img
                src={logoPreview || "/placeholder.svg"}
                alt="Logo preview"
                className="h-20 w-auto max-w-32 object-contain border rounded-lg bg-white p-2 shadow-sm"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 hover:scale-110 transition-transform"
                onClick={removeLogo}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
          )}

          {uploadError && (
            <Alert variant="destructive" className="animate-in slide-in-from-top duration-300">
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description/Achievement</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Brief description of the achievement or completion"
          rows={3}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor/Authorizer</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => updateField("instructor", e.target.value)}
            placeholder="Name of instructor or authorizing person"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="template">Template Style</Label>
          <Select value={formData.template} onValueChange={(value) => updateField("template", value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-4">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Professional Quality:</strong> Generate high-quality certificates with custom logos and professional
            templates. Perfect for institutions, organizations, and businesses.
          </p>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full hover:scale-[1.02] transition-all duration-200"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating Preview...
          </>
        ) : (
          "Generate Certificate Preview"
        )}
      </Button>
    </form>
  )
}
