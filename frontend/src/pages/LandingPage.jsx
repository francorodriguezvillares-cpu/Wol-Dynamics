import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Zap, 
  Globe, 
  TrendingUp, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Users,
  Clock,
  Shield,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Removed Select import - using native select

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo component with name
const Logo = ({ showName = true, size = "default" }) => (
  <div className="flex items-center gap-3">
    <img 
      src="https://customer-assets.emergentagent.com/job_7fefe2a2-058b-4f01-a536-059fbe112580/artifacts/4x0i1208_Logo%20Wol%20Dynamics.png" 
      alt="Wol Dynamics" 
      className={size === "large" ? "h-14 w-auto" : "h-10 w-auto"}
    />
    {showName && (
      <div className="flex flex-col">
        <span className={`font-heading font-bold text-foreground leading-none ${size === "large" ? "text-2xl" : "text-xl"}`}>
          WOL <span className="text-primary">DYNAMICS</span>
        </span>
      </div>
    )}
  </div>
);

// WhatsApp Icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#planes", label: "Planes" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-3' : 'py-5'
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3" data-testid="logo-link">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#contacto">
            <Button 
              className="skew-button bg-primary hover:bg-primary/90 text-black font-semibold px-6"
              data-testid="nav-cta-button"
            >
              <span className="skew-button-content flex items-center gap-2">
                Consulta Gratis
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-strong mt-3 mx-6 rounded-lg p-6" data-testid="mobile-menu">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold mt-2">
                Consulta Gratis
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
      data-testid="hero-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">
              AUTOMATIZACIÓN · DESARROLLO · MARKETING
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up leading-tight pb-2"
            style={{ animationDelay: '0.1s' }}
          >
            Transformamos tu negocio con
            <span className="block text-primary text-glow mt-2 pb-1">
              Automatización Inteligente
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-body animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Optimizamos procesos, creamos experiencias digitales únicas y potenciamos 
            tu presencia online con soluciones tecnológicas de vanguardia.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a href="#contacto">
              <Button 
                size="lg" 
                className="skew-button bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 text-base"
                data-testid="hero-cta-primary"
              >
                <span className="skew-button-content flex items-center gap-2">
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </a>
            <a href="#servicios">
              <Button 
                size="lg" 
                variant="outline" 
                className="skew-button border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-base"
                data-testid="hero-cta-secondary"
              >
                <span className="skew-button-content flex items-center gap-2">
                  Ver Servicios
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { value: "50+", label: "Proyectos" },
              { value: "98%", label: "Satisfacción" },
              { value: "24/7", label: "Soporte" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary text-glow-sm">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Cpu,
      title: "Automatización de Procesos",
      description: "Eliminamos tareas repetitivas y optimizamos flujos de trabajo con sistemas inteligentes que trabajan 24/7.",
      features: ["Integración de sistemas", "Workflows automáticos", "Reportes en tiempo real"]
    },
    {
      icon: Globe,
      title: "Desarrollo Web",
      description: "Creamos sitios web y aplicaciones modernas, rápidas y optimizadas para convertir visitantes en clientes.",
      features: ["Diseño responsive", "SEO optimizado", "Alta velocidad"]
    },
    {
      icon: TrendingUp,
      title: "Marketing Digital",
      description: "Estrategias de marketing basadas en datos que maximizan tu ROI y escalan tu negocio.",
      features: ["Campañas publicitarias", "Email marketing", "Análisis de métricas"]
    }
  ];

  return (
    <section 
      id="servicios" 
      className="relative py-24 overflow-hidden"
      data-testid="services-section"
    >
      <div className="absolute inset-0 gradient-radial" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider">SERVICIOS</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Soluciones que impulsan tu <span className="text-primary">crecimiento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combinamos tecnología avanzada con estrategia de negocio para crear soluciones 
            que generan resultados reales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="service-card glass p-8 rounded-lg group hover:border-primary/50"
              data-testid={`service-card-${index}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "300.000",
      description: "Automatización de un proceso",
      features: [
        "Análisis de procesos",
        "1 automatización personalizada",
        "Documentación completa",
        "30 días de soporte",
        "Capacitación básica"
      ],
      featured: false
    },
    {
      name: "Plan Profesional",
      price: "700.000",
      description: "Integración entre múltiples sistemas",
      features: [
        "Todo del Plan Básico",
        "Hasta 3 automatizaciones",
        "Integración de APIs",
        "Dashboard de métricas",
        "90 días de soporte",
        "Capacitación avanzada"
      ],
      featured: true
    },
    {
      name: "Plan Empresa",
      price: "Cotización",
      description: "Automatización integral + soporte mensual",
      features: [
        "Todo del Plan Profesional",
        "Automatizaciones ilimitadas",
        "Arquitectura personalizada",
        "Soporte prioritario mensual",
        "Account manager dedicado",
        "SLA garantizado"
      ],
      featured: false
    }
  ];

  return (
    <section 
      id="planes" 
      className="relative py-24 overflow-hidden"
      data-testid="pricing-section"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider">PLANES</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Inversión que genera <span className="text-primary">retorno</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Planes diseñados para cada etapa de tu negocio. Sin costos ocultos.
          </p>
          
          {/* Consulta Banner */}
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mt-8 border-glow">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Primera consulta:</span>
            <span className="text-primary font-heading font-bold">$50.000</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative rounded-lg p-8 ${
                plan.featured 
                  ? 'price-card-featured glass-strong scale-105' 
                  : 'glass'
              }`}
              data-testid={`pricing-card-${index}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-bold">
                  MÁS POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price !== "Cotización" && (
                    <span className="text-muted-foreground">$</span>
                  )}
                  <span className={`font-heading text-4xl font-bold ${plan.featured ? 'text-primary text-glow-sm' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Cotización" && (
                    <span className="text-muted-foreground text-sm ml-1">ARS</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contacto" className="block">
                <Button 
                  className={`w-full skew-button ${
                    plan.featured 
                      ? 'bg-primary hover:bg-primary/90 text-black' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                  data-testid={`pricing-cta-${index}`}
                >
                  <span className="skew-button-content">
                    {plan.price === "Cotización" ? "Solicitar Cotización" : "Empezar Ahora"}
                  </span>
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const projects = [
    {
      title: "E-commerce Automatizado",
      category: "Automatización",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
      description: "Sistema de gestión de inventario y pedidos automatizado"
    },
    {
      title: "Plataforma SaaS",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Dashboard analítico con integraciones múltiples"
    },
    {
      title: "Campaña Digital 360",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Estrategia multicanal con 300% ROI"
    },
    {
      title: "CRM Personalizado",
      category: "Automatización",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      description: "Gestión de clientes con IA integrada"
    }
  ];

  return (
    <section 
      id="portfolio" 
      className="relative py-24 overflow-hidden"
      data-testid="portfolio-section"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider">PORTFOLIO</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Proyectos que <span className="text-primary">hablan por sí solos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resultados tangibles para empresas reales.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="group relative glass rounded-lg overflow-hidden"
              data-testid={`portfolio-item-${index}`}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Wol Dynamics automatizó nuestro proceso de facturación y redujimos errores en un 95%. Increíble trabajo.",
      author: "María González",
      role: "CEO, TechStart",
      avatar: "MG"
    },
    {
      content: "El equipo entendió exactamente lo que necesitábamos. Nuestra web convierte 3x más que antes.",
      author: "Carlos Rodríguez",
      role: "Fundador, EcoStore",
      avatar: "CR"
    },
    {
      content: "Las campañas de marketing superaron todas nuestras expectativas. ROI del 400% en 3 meses.",
      author: "Ana Martínez",
      role: "CMO, FinanceApp",
      avatar: "AM"
    },
    {
      content: "Profesionales, puntuales y con resultados. Ya llevamos 5 proyectos juntos.",
      author: "Diego López",
      role: "Director, LogiTech",
      avatar: "DL"
    }
  ];

  return (
    <section 
      id="testimonios" 
      className="relative py-24 overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider">TESTIMONIOS</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Lo que dicen <span className="text-primary">nuestros clientes</span>
          </h2>
        </div>

        {/* Testimonials Marquee */}
        <div className="marquee">
          <div className="marquee-content gap-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[400px] glass p-6 rounded-lg"
                data-testid={`testimonial-${index}`}
              >
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-heading font-bold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      toast.error("Error al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contacto" 
      className="relative py-24 overflow-hidden"
      data-testid="contact-section"
    >
      <div className="absolute inset-0 gradient-radial" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div>
            <span className="text-primary font-mono text-sm tracking-wider">CONTACTO</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              ¿Listo para <span className="text-primary">automatizar</span> tu negocio?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Contanos sobre tu proyecto y te ayudamos a encontrar la mejor solución. 
              Primera consulta de diagnóstico a solo $50.000.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WhatsApp</div>
                  <a 
                    href="https://wa.me/5491135921999" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    +54 11 3592-1999
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Horario</div>
                  <div className="text-foreground">Lun - Vie: 9:00 - 18:00</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Garantía</div>
                  <div className="text-foreground">Satisfacción 100% garantizada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-strong rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/50 border-white/10 focus:border-primary/50 text-white h-12"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black/50 border-white/10 focus:border-primary/50 text-white h-12"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    placeholder="+54 11 1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-black/50 border-white/10 focus:border-primary/50 text-white h-12"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Servicio *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white h-12 rounded-md px-3 appearance-none"
                    data-testid="contact-service-select"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="" disabled>Seleccionar servicio</option>
                    <option value="automatizacion">Automatización</option>
                    <option value="desarrollo">Desarrollo Web</option>
                    <option value="marketing">Marketing Digital</option>
                    <option value="consulta">Consulta General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Mensaje *
                </label>
                <Textarea
                  placeholder="Contanos sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/50 border-white/10 focus:border-primary/50 text-white min-h-[120px] resize-none"
                  data-testid="contact-message-input"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full skew-button bg-primary hover:bg-primary/90 text-black font-semibold h-12"
                data-testid="contact-submit-button"
              >
                <span className="skew-button-content flex items-center justify-center gap-2">
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-white/5" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Wol Dynamics. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </a>
            <a href="#planes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Planes
            </a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5491135921999"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button animate-pulse-glow"
      data-testid="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030305]">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
