"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { CertificateForm } from "@/components/certificate-form"
import { CertificatePreview } from "@/components/certificate-preview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Award, Shield } from "lucide-react"
import Link from "next/link"

export interface CertificateData {
  recipientName: string
  category: string
  title: string
  institution: string
  description: string
  date: string
  instructor: string
  template: string
  logo?: string
}

export default function CertificateGenerator() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "",
    category: categoryParam || "academic",
    title: "",
    institution: "",
    description: "",
    date: "",
    instructor: "",
    template: "classic",
    logo: undefined,
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleFormSubmit = (data: CertificateData) => {
    setCertificateData(data)
    setShowPreview(true)
  }

  const handleBackToForm = () => {
    setShowPreview(false)
  }

  const getCategoryTitle = (category: string) => {
    const titles = {
      academic: "Academic Certificate",
      professional: "Professional Training Certificate",
      sports: "Sports & Recreation Certificate",
      community: "Community Service Certificate",
      workshop: "Workshop & Events Certificate",
    }
    return titles[category as keyof typeof titles] || "Certificate"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getCategoryTitle(certificateData.category)}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        {!showPreview ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Certificate Information
                  </CardTitle>
                  <CardDescription>Fill in the details below to generate your professional certificate</CardDescription>
                </CardHeader>
                <CardContent>
                  <CertificateForm onSubmit={handleFormSubmit} initialCategory={categoryParam || "academic"} />
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <p>✓ Upload custom logos</p>
                  <p>✓ Professional templates</p>
                  <p>✓ High-quality PDF export</p>
                  <p>✓ No watermarks</p>
                  <p>✓ Instant preview</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Styles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>Classic:</strong> Traditional formal design
                  </p>
                  <p>
                    <strong>Modern:</strong> Clean contemporary layout
                  </p>
                  <p>
                    <strong>Elegant:</strong> Sophisticated styling
                  </p>
                  <p>
                    <strong>Bold:</strong> Eye-catching design
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <CertificatePreview data={certificateData} onBack={handleBackToForm} />
        )}
      </div>
    </div>
  )
}
