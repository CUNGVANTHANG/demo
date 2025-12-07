import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProductAdvice = async (productName: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Hãy đóng vai một chuyên gia dinh dưỡng và tư vấn bán hàng trái cây. 
    Hãy viết một đoạn văn ngắn khoảng 100 từ về công dụng sức khỏe và mẹo chọn quả ngon cho sản phẩm: "${productName}". 
    Văn phong thân thiện, hấp dẫn khách hàng Việt Nam.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Hiện tại AI đang bận, vui lòng thử lại sau.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Không thể tải tư vấn từ AI lúc này.";
  }
};

export const generateQuickRecipe = async (productName: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Hãy gợi ý một công thức món ăn hoặc đồ uống đơn giản, dễ làm tại nhà với nguyên liệu chính là: "${productName}".
    Trả về định dạng ngắn gọn: Tên món, Nguyên liệu chính, và 3 bước thực hiện cơ bản.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Không tìm thấy công thức phù hợp.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lỗi khi tạo công thức.";
  }
};
