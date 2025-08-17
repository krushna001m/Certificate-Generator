"use client"

import { useState, useEffect } from "react"
import type { CertificateData } from "@/app/generator/page"

interface CertificateTemplateProps {
  data: CertificateData
}

export function CertificateTemplate({ data }: CertificateTemplateProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [data])

  const getTemplateStyles = () => {
    switch (data.template) {
      case "modern":
        return {
          container: "bg-white text-gray-900 border-4 border-gray-200 shadow-2xl",
          header: "text-gray-800 font-light",
          title: "text-4xl font-thin text-gray-900",
          accent: "bg-blue-500",
          gradient: "from-blue-50 to-gray-50",
        }
      case "formal":
        return {
          container: "bg-cream text-gray-900 border-8 border-double border-gray-800 shadow-2xl",
          header: "text-gray-800 font-serif",
          title: "text-4xl font-serif text-gray-900",
          accent: "bg-gray-800",
          gradient: "from-amber-50 to-yellow-50",
        }
      case "creative":
        return {
          container: "bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900 border-4 border-purple-300 shadow-2xl",
          header: "text-purple-800 font-bold",
          title: "text-4xl font-bold text-purple-900",
          accent: "bg-purple-500",
          gradient: "from-purple-100 to-blue-100",
        }
      default: // classic
        return {
          container: "bg-white text-gray-900 border-4 border-blue-600 shadow-2xl",
          header: "text-blue-800 font-semibold",
          title: "text-4xl font-bold text-blue-900",
          accent: "bg-blue-600",
          gradient: "from-blue-50 to-indigo-50",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <div
      className={`relative w-full aspect-[4/3] p-12 ${styles.container} transition-all duration-500 ${
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-30`}></div>

      {/* Certificate Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-center">
        {/* Header with Logo */}
        <div className="space-y-4">
          {data.logo && (
            <div className="flex justify-center mb-4 animate-in fade-in duration-700 delay-300">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <img
                  src={data.logo || "/placeholder.svg"}
                  alt="Institution Logo"
                  className="h-16 w-auto max-w-24 object-contain"
                />
              </div>
            </div>
          )}
          <div
            className={`w-16 h-1 ${styles.accent} mx-auto animate-in slide-in-from-left duration-500 delay-100`}
          ></div>
          <h1 className={`text-2xl ${styles.header} animate-in fade-in duration-500 delay-200`}>{data.institution}</h1>
          <div
            className={`w-24 h-0.5 ${styles.accent} mx-auto animate-in slide-in-from-right duration-500 delay-300`}
          ></div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-in fade-in duration-700 delay-400">
          <h2 className={`${styles.title} leading-tight`}>{data.title}</h2>

          <div className="space-y-4">
            <p className="text-lg">This is to certify that</p>
            <div className="relative">
              <p className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mx-8 animate-in slide-in-from-bottom duration-500 delay-500">
                {data.recipientName}
              </p>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
            <p className="text-lg">has successfully {data.category === "academic" ? "achieved" : "completed"}</p>
            {data.description && (
              <p className="text-base text-gray-700 max-w-md mx-auto animate-in fade-in duration-500 delay-600">
                {data.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end animate-in slide-in-from-bottom duration-500 delay-700">
          <div className="text-left">
            <div className="w-32 border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="text-sm font-semibold">
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {data.instructor && (
            <div className="text-right">
              <div className="w-32 border-b border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Authorized by</p>
              <p className="text-sm font-semibold">{data.instructor}</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-400 animate-in slide-in-from-top-left duration-300"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-400 animate-in slide-in-from-top-right duration-300 delay-100"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-400 animate-in slide-in-from-bottom-left duration-300 delay-200"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-400 animate-in slide-in-from-bottom-right duration-300 delay-300"></div>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 -skew-x-12 animate-pulse"></div>
    </div>
  )
}
