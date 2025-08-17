"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Download, QrCode, Share2, Printer, CheckCircle, Loader2 } from "lucide-react"
import type { CertificateData } from "@/app/generator/page"
import { CertificateTemplate } from "@/components/certificate-template"

interface CertificatePreviewProps {
  data: CertificateData
  onBack: () => void
}

export function CertificatePreview({ data, onBack }: CertificatePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would generate and download a PDF
      const link = document.createElement("a")
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`Certificate for ${data.recipientName}`)
      link.download = `${data.recipientName.replace(/\s+/g, "_")}_Certificate.txt`
      link.click()

      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificate: ${data.title}`,
          text: `${data.recipientName} has earned: ${data.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Share cancelled or failed")
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Certificate link copied to clipboard!")
    }
  }

  const generateQRCode = () => {
    const verificationData = {
      recipient: data.recipientName,
      title: data.title,
      institution: data.institution,
      date: data.date,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    }
    return `CERT-${verificationData.id}`
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 bg-transparent hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent hover:scale-105 transition-transform"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent hover:scale-105 transition-transform"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent hover:scale-105 transition-transform"
          >
            <QrCode className="h-4 w-4" />
            {generateQRCode()}
          </Button>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Alert */}
      {downloadSuccess && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 animate-in slide-in-from-top duration-300">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Certificate downloaded successfully! Check your downloads folder.
          </AlertDescription>
        </Alert>
      )}

      {/* Certificate Preview */}
      <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-0">
          <CertificateTemplate data={data} />
        </CardContent>
      </Card>

      {/* Certificate Details */}
      <Card className="animate-in slide-in-from-bottom duration-500 delay-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4 text-lg">Certificate Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Recipient:</span>
              <span className="font-semibold">{data.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Category:</span>
              <span className="capitalize">{data.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Title:</span>
              <span>{data.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Institution:</span>
              <span>{data.institution}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Date:</span>
              <span>{new Date(data.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Template:</span>
              <span className="capitalize">{data.template}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">Logo:</span>
              <span className={data.logo ? "text-green-600 font-semibold" : "text-gray-500"}>
                {data.logo ? "✓ Uploaded" : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">QR Code:</span>
              <span className="font-mono text-xs">{generateQRCode()}</span>
            </div>
          </div>
          {data.description && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="font-medium text-gray-600 dark:text-gray-400">Description:</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{data.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
