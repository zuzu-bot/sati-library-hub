import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Shield, Sparkles, ArrowRight, Library, Users, Search } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Library className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">SATI Library</span>
              <p className="text-[10px] text-muted-foreground leading-none">Powered by AI</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button variant="royal" size="sm">Get Started <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/3 rounded-full" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI-Powered Library Management
            </span>
          </motion.div>
          
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">The Royal</span>
            <br />
            <span className="text-gradient-gold">Knowledge Vault</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Samrat Ashok Technological Institute's intelligent library system. Discover, reserve, and manage books with the power of AI — built for students, by innovators.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button variant="royal" size="xl">
                <BookOpen className="h-5 w-5" /> Enter Library
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="lg">
                <Brain className="h-5 w-5" /> AI Book Finder
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "12,450+", label: "Books", icon: BookOpen },
              { value: "5,640", label: "Students", icon: Users },
              { value: "AI", label: "Powered Search", icon: Brain },
              { value: "24/7", label: "Access", icon: Shield },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center glow-gold">
                <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Intelligent Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A fusion of royal tradition and cutting-edge technology</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Book Recommendations", desc: "Get personalized suggestions based on your reading history, courses, and interests using advanced AI." },
              { icon: Search, title: "Smart Search", desc: "Search by title, author, ISBN, or even describe what you're looking for in natural language." },
              { icon: Shield, title: "Secure & Role-Based", desc: "Three-tier access — Students, Librarians, and Admins — each with tailored dashboards and permissions." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 glow-gold hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">About SATI Library</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The Samrat Ashok Technological Institute library houses over 12,000 volumes across engineering, science, arts, and more. 
              Our new AI-powered system makes knowledge accessible like never before — search smarter, borrow faster, learn deeper.
            </p>
            <Link to="/login">
              <Button variant="royal" size="lg">Join Now <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Library className="h-5 w-5 text-primary" />
                <span className="font-display text-lg font-bold text-foreground">SATI Library</span>
              </div>
              <p className="text-sm text-muted-foreground">Samrat Ashok Technological Institute, Vidisha, Madhya Pradesh, India</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Student Login</Link>
                <a href="#features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Contact</h4>
              <p className="text-sm text-muted-foreground">library@sfrcdgroup.ac.in</p>
              <p className="text-sm text-muted-foreground">+91 7592-250692</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-xs text-muted-foreground">© 2026 SATI Library. Built with ❤️ and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
