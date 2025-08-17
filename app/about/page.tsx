import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "Professional Quality",
      description: "High-quality certificate templates designed by professionals for any occasion.",
    },
    {
      icon: Users,
      title: "Multi-Category Support",
      description: "Academic, professional, sports, community service, and workshop certificates.",
    },
    {
      icon: Shield,
      title: "Custom Branding",
      description: "Upload your institution or company logo for branded certificates.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Create and preview certificates instantly with our fast generation system.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Certificates Generated" },
    { number: "500+", label: "Organizations" },
    { number: "50+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About CertGen</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to providing institutions, organizations, and businesses with professional-grade certificate
            generation tools that are both powerful and easy to use.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose CertGen?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mission */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              To democratize professional certificate creation by providing accessible, high-quality tools that help
              organizations recognize achievements and celebrate success.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
