# Wol Dynamics - PRD

## Original Problem Statement
Crear una página web para Wol Dynamics - agencia de automatizaciones, desarrollo web y campañas de marketing. Incluye planes de precios y formulario de contacto.

## User Personas
- **Empresas PyMEs**: Buscan automatizar procesos para reducir costos
- **Emprendedores**: Necesitan presencia web profesional
- **Startups**: Requieren marketing digital para escalar

## Core Requirements
- Landing page profesional con tema oscuro futurista
- Secciones: Hero, Servicios, Planes, Portfolio, Testimonios, Contacto
- Planes de precios en pesos argentinos (Básico $300k, Profesional $700k, Empresa cotización)
- Primera consulta $50.000
- Formulario de contacto funcional
- Panel admin para gestionar mensajes
- Integración WhatsApp (+54 11 3592-1999)

## What's Been Implemented (Feb 2026)
- ✅ Landing page completa con todas las secciones
- ✅ Navegación responsive con menú móvil
- ✅ Hero section con animaciones y estadísticas
- ✅ Sección de servicios (Automatización, Web, Marketing)
- ✅ Planes de precios con diseño destacado para Plan Profesional
- ✅ Portfolio con proyectos de ejemplo
- ✅ Testimonios con marquee animado
- ✅ Formulario de contacto funcional (guarda en MongoDB)
- ✅ Panel admin con tabla de mensajes y vista detallada
- ✅ Botón flotante de WhatsApp
- ✅ Tema oscuro futurista con colores cian/azul
- ✅ Tipografía: Syne (headings), Manrope (body)

## API Endpoints
- `POST /api/contact` - Crear mensaje de contacto
- `GET /api/contact` - Listar mensajes
- `PATCH /api/contact/{id}/read` - Marcar como leído
- `DELETE /api/contact/{id}` - Eliminar mensaje
- `GET /api/stats` - Estadísticas de mensajes

## Tech Stack
- Frontend: React 19 + Tailwind CSS + Shadcn/UI
- Backend: FastAPI + Motor (async MongoDB)
- Database: MongoDB

## Prioritized Backlog
### P0 (Completado)
- [x] Landing page funcional
- [x] Formulario de contacto
- [x] Panel admin

### P1 (Próximas Iteraciones)
- [ ] Autenticación para panel admin
- [ ] Notificaciones por email al recibir mensajes
- [ ] SEO meta tags dinámicos
- [ ] Analytics integration

### P2 (Mejoras Futuras)
- [ ] Blog/artículos sobre automatización
- [ ] Casos de estudio detallados
- [ ] Integración con CRM
- [ ] Chat en vivo
