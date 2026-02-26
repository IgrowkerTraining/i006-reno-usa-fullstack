class HealthController {
  async check(req, res) {
    try {
      res.json({ 
        status: "ok", 
        timestamp: new Date(),
        uptime: process.uptime()
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error", 
        timestamp: new Date(),
        error: "Health check failed"
      });
    }
  }
}

export default new HealthController();
