import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9be6440c/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoints
app.post("/make-server-9be6440c/contact-submissions", async (c) => {
  try {
    const submission = await c.req.json();
    const submissionWithTimestamp = {
      ...submission,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    await kv.set(`contact_submission_${submissionWithTimestamp.id}`, submissionWithTimestamp);
    
    console.log('Contact submission saved:', submissionWithTimestamp);
    return c.json({ success: true, submission: submissionWithTimestamp });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-9be6440c/contact-submissions", async (c) => {
  try {
    const submissions = await kv.getByPrefix('contact_submission_');
    // Sort by timestamp descending (newest first)
    const sortedSubmissions = submissions.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });
    
    console.log(`Retrieved ${submissions.length} contact submissions`);
    return c.json({ success: true, submissions: sortedSubmissions });
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/contact-submissions/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`contact_submission_${id}`);
    
    console.log(`Deleted contact submission: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Study Materials endpoints
app.get("/make-server-9be6440c/materials", async (c) => {
  try {
    const materials = await kv.getByPrefix('material_');
    console.log(`Retrieved ${materials.length} study materials`);
    return c.json({ success: true, materials });
  } catch (error) {
    console.error('Error retrieving materials:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-9be6440c/materials", async (c) => {
  try {
    const material = await c.req.json();
    const materialWithId = {
      ...material,
      id: Date.now()
    };
    
    await kv.set(`material_${materialWithId.id}`, materialWithId);
    console.log('Material saved:', materialWithId);
    return c.json({ success: true, material: materialWithId });
  } catch (error) {
    console.error('Error saving material:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/materials/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`material_${id}`);
    console.log(`Deleted material: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting material:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Toppers endpoints
app.get("/make-server-9be6440c/toppers", async (c) => {
  try {
    const toppers = await kv.getByPrefix('topper_');
    console.log(`Retrieved ${toppers.length} toppers`);
    return c.json({ success: true, toppers });
  } catch (error) {
    console.error('Error retrieving toppers:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-9be6440c/toppers", async (c) => {
  try {
    const topper = await c.req.json();
    const topperWithId = {
      ...topper,
      id: Date.now()
    };
    
    await kv.set(`topper_${topperWithId.id}`, topperWithId);
    console.log('Topper saved:', topperWithId);
    return c.json({ success: true, topper: topperWithId });
  } catch (error) {
    console.error('Error saving topper:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/toppers/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`topper_${id}`);
    console.log(`Deleted topper: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting topper:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Teachers endpoints
app.get("/make-server-9be6440c/teachers", async (c) => {
  try {
    const teachers = await kv.getByPrefix('teacher_');
    console.log(`Retrieved ${teachers.length} teachers`);
    return c.json({ success: true, teachers });
  } catch (error) {
    console.error('Error retrieving teachers:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-9be6440c/teachers", async (c) => {
  try {
    const teacher = await c.req.json();
    const teacherWithId = {
      ...teacher,
      id: Date.now()
    };
    
    await kv.set(`teacher_${teacherWithId.id}`, teacherWithId);
    console.log('Teacher saved:', teacherWithId);
    return c.json({ success: true, teacher: teacherWithId });
  } catch (error) {
    console.error('Error saving teacher:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/teachers/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`teacher_${id}`);
    console.log(`Deleted teacher: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Gallery endpoints
app.get("/make-server-9be6440c/gallery", async (c) => {
  try {
    const photos = await kv.getByPrefix('gallery_');
    console.log(`Retrieved ${photos.length} gallery photos`);
    return c.json({ success: true, photos });
  } catch (error) {
    console.error('Error retrieving gallery photos:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-9be6440c/gallery", async (c) => {
  try {
    const photo = await c.req.json();
    const photoWithId = {
      ...photo,
      id: Date.now()
    };
    
    await kv.set(`gallery_${photoWithId.id}`, photoWithId);
    console.log('Gallery photo saved:', photoWithId);
    return c.json({ success: true, photo: photoWithId });
  } catch (error) {
    console.error('Error saving gallery photo:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/gallery/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`gallery_${id}`);
    console.log(`Deleted gallery photo: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery photo:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Testimonials endpoints
app.get("/make-server-9be6440c/testimonials", async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial_');
    console.log(`Retrieved ${testimonials.length} testimonials`);
    return c.json({ success: true, testimonials });
  } catch (error) {
    console.error('Error retrieving testimonials:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-9be6440c/testimonials", async (c) => {
  try {
    const testimonial = await c.req.json();
    const testimonialWithId = {
      ...testimonial,
      id: Date.now()
    };
    
    await kv.set(`testimonial_${testimonialWithId.id}`, testimonialWithId);
    console.log('Testimonial saved:', testimonialWithId);
    return c.json({ success: true, testimonial: testimonialWithId });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-9be6440c/testimonials/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`testimonial_${id}`);
    console.log(`Deleted testimonial: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);