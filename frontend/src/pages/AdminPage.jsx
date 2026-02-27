import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle, 
  Clock,
  MessageSquare,
  RefreshCw,
  User,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo component
const Logo = () => (
  <img 
    src="https://customer-assets.emergentagent.com/job_7fefe2a2-058b-4f01-a536-059fbe112580/artifacts/4x0i1208_Logo%20Wol%20Dynamics.png" 
    alt="Wol Dynamics" 
    className="h-8 w-auto"
  />
);

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const [messagesRes, statsRes] = await Promise.all([
        axios.get(`${API}/contact`),
        axios.get(`${API}/stats`)
      ]);
      setMessages(messagesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error("Error al cargar mensajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API}/contact/${id}/read`);
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
      setStats({ ...stats, unread: stats.unread - 1 });
      toast.success("Mensaje marcado como leído");
    } catch (error) {
      toast.error("Error al actualizar mensaje");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API}/contact/${id}`);
      setMessages(messages.filter(m => m.id !== id));
      setStats({ ...stats, total: stats.total - 1 });
      setSelectedMessage(null);
      toast.success("Mensaje eliminado");
    } catch (error) {
      toast.error("Error al eliminar mensaje");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceLabel = (service) => {
    const labels = {
      automatizacion: "Automatización",
      desarrollo: "Desarrollo Web",
      marketing: "Marketing Digital",
      consulta: "Consulta General"
    };
    return labels[service] || service;
  };

  return (
    <div className="min-h-screen bg-[#030305]" data-testid="admin-page">
      {/* Header */}
      <header className="glass-strong border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3" data-testid="admin-logo-link">
                <Logo />
              </a>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="font-heading text-lg font-semibold text-foreground">
                Panel de Administración
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchMessages}
                className="border-white/10 text-muted-foreground hover:text-foreground"
                data-testid="refresh-button"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <a href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-muted-foreground hover:text-foreground"
                  data-testid="back-to-site-button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al sitio
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass p-6 rounded-lg" data-testid="stat-total">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Mensajes</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-lg" data-testid="stat-unread">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sin Leer</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.unread}</p>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-lg" data-testid="stat-read">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leídos</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.total - stats.unread}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Table / Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="glass rounded-lg overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h2 className="font-heading font-semibold text-foreground">Mensajes Recibidos</h2>
              </div>
              
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  Cargando mensajes...
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  No hay mensajes todavía
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Estado</TableHead>
                        <TableHead className="text-muted-foreground">Nombre</TableHead>
                        <TableHead className="text-muted-foreground">Servicio</TableHead>
                        <TableHead className="text-muted-foreground">Fecha</TableHead>
                        <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow 
                          key={message.id}
                          className={`border-white/5 cursor-pointer transition-colors ${
                            selectedMessage?.id === message.id 
                              ? 'bg-primary/10' 
                              : 'hover:bg-white/5'
                          } ${!message.read ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedMessage(message)}
                          data-testid={`message-row-${message.id}`}
                        >
                          <TableCell>
                            <Badge 
                              variant={message.read ? "secondary" : "default"}
                              className={message.read ? "bg-muted text-muted-foreground" : "bg-primary text-black"}
                            >
                              {message.read ? "Leído" : "Nuevo"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {message.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {getServiceLabel(message.service)}
                          </TableCell>
                          <TableCell className="text-muted-foreground font-mono text-sm">
                            {formatDate(message.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!message.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(message.id);
                                  }}
                                  className="text-muted-foreground hover:text-primary"
                                  data-testid={`mark-read-${message.id}`}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-muted-foreground hover:text-destructive"
                                    data-testid={`delete-${message.id}`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-secondary border-white/10">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-foreground">¿Eliminar mensaje?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-muted-foreground">
                                      Esta acción no se puede deshacer. El mensaje de {message.name} será eliminado permanentemente.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80">Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteMessage(message.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg overflow-hidden sticky top-24">
              <div className="p-4 border-b border-white/5">
                <h2 className="font-heading font-semibold text-foreground">Detalle del Mensaje</h2>
              </div>
              
              {selectedMessage ? (
                <div className="p-6 space-y-6" data-testid="message-detail">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge 
                        variant={selectedMessage.read ? "secondary" : "default"}
                        className={selectedMessage.read ? "bg-muted text-muted-foreground" : "bg-primary text-black"}
                      >
                        {selectedMessage.read ? "Leído" : "Nuevo"}
                      </Badge>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDate(selectedMessage.created_at)}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{selectedMessage.name}</p>
                        <p className="text-sm text-muted-foreground">Cliente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>

                    {selectedMessage.phone && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a 
                          href={`tel:${selectedMessage.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{getServiceLabel(selectedMessage.service)}</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-2">MENSAJE</p>
                    <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!selectedMessage.read && (
                      <Button
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-black"
                        data-testid="detail-mark-read"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marcar como leído
                      </Button>
                    )}
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-white/10 text-foreground hover:bg-white/5"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selecciona un mensaje para ver los detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
