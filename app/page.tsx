"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  GraduationCap,
  Briefcase,
  Trophy,
  Heart,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Upload,
  Download,
  Palette,
} from "lucide-react"

export default function LandingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: "academic",
      title: "Academic Certificates",
      description:
        "Generate professional academic achievement certificates for courses, degrees, and educational milestones",
      icon: GraduationCap,
      color: "bg-blue-500",
      features: ["Course Completion", "Degree Certificates", "Honor Roll", "Academic Excellence"],
      popular: true,
    },
    {
      id: "professional",
      title: "Professional Training",
      description: "Create certificates for workplace training, skill development, and professional certifications",
      icon: Briefcase,
      color: "bg-green-500",
      features: ["Skills Training", "Safety Certification", "Leadership Programs", "Technical Skills"],
    },
    {
      id: "sports",
      title: "Sports & Recreation",
      description: "Design certificates for sports achievements, tournaments, and recreational activities",
      icon: Trophy,
      color: "bg-yellow-500",
      features: ["Tournament Winners", "Participation Awards", "Team Recognition", "Athletic Achievement"],
    },
    {
      id: "community",
      title: "Community Service",
      description: "Recognize volunteer work and community contributions with meaningful certificates",
      icon: Heart,
      color: "bg-red-500",
      features: ["Volunteer Hours", "Community Impact", "Service Awards", "Charity Work"],
    },
    {
      id: "workshop",
      title: "Workshop & Events",
      description: "Certificate templates for workshops, seminars, conferences, and special events",
      icon: Users,
      color: "bg-purple-500",
      features: ["Workshop Attendance", "Seminar Completion", "Conference Participation", "Event Recognition"],
    },
  ]

  const features = [
    {
      icon: Upload,
      title: "Logo Upload",
      description: "Upload your institution or company logo for branded certificates",
    },
    {
      icon: Palette,
      title: "Custom Templates",
      description: "Choose from multiple professional design templates",
    },
    {
      icon: Download,
      title: "High-Quality Export",
      description: "Download certificates in high-resolution PDF format",
    },
    {
      icon: CheckCircle,
      title: "Professional Quality",
      description: "Clean, professional designs suitable for any occasion",
    },
  ]

  const handleServiceSelect = (serviceId: string) => {
    // Navigate to certificate generator with selected category
    window.location.href = `/generator?category=${serviceId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Certificate Generator</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create professional, customizable certificates for any occasion. Perfect for educational institutions,
            businesses, and organizations looking to recognize achievements and milestones.
          </p>
        </div>
      </header>

      {/* Features Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Certificate Generator?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional-grade certificate creation with all the features you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certificate Categories</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our specialized certificate categories, each designed for specific use cases
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="relative hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}

                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 ${service.color} rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceSelect(service.id)
                    }}
                  >
                    Create Certificate
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Certificate?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of educators and organizations who trust our platform
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => handleServiceSelect("academic")}
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          © 2024 Certificate Generator. All certificates are for educational and demonstration purposes only.
        </p>
      </footer>
    </div>
  )
}
