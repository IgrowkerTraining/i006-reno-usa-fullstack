import { getAiProjectAnalysis } from "../services/ai.service.js";

export const generateReport = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // Llamada a servicio 
    const aiResult = await getAiProjectAnalysis(projectId);

    res.status(200).json({
      status: "success",
      data: aiResult
    });
  } catch (error) {
    console.error("🚨 Error en generateReport:", error.message);
    res.status(500).json({ error: error.message });
  }
};