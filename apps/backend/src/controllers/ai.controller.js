import { generateAndSaveReport } from "../services/ai.service.js";

export const generateReport = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // Llamada a servicio 
    const aiResult = await generateAndSaveReport(projectId);

    res.status(201).json({
      message: "Análisis de IA generado y guardado con éxito",
      data: aiResult
    });
  } catch (error) {
    console.error("🚨 Error en generateReport:", error.message);
    res.status(400).json({ error: error.message });
  }
};