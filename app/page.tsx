"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  Newspaper,
  BookOpen,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Eye,
  Upload,
  X,
  Loader2,
  CheckCircle,
  Download,
  FileSpreadsheet,
  Search,
} from "lucide-react";
import { saveResearchData, getAllResearchData } from "@/lib/firebaseService";

interface Member {
  id: number;
  name: string;
}

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  file?: File; // Add File object
  url?: string; // Add URL after upload
}

interface Topic {
  id: number;
  name: string;
  type: string;
  members: Member[];
  experimentType: string;
  regulationNumber: string;
  implementationNumber: string;
  files: UploadedFile[];
}

interface Article {
  id: number;
  title: string;
  journalTitle: string;
  members: Member[];
  publisher: string;
  ranking: string;
  issueNumber: string;
  doi: string;
  regulationNumber: string;
  implementationNumber: string;
  files: UploadedFile[];
}

interface Book {
  id: number;
  title: string;
  authors: string;
  publisher: string;
  isbn: string;
  publicationYear: string;
  regulationNumber: string;
  implementationNumber: string;
  files: UploadedFile[];
}

interface Guidance {
  id: number;
  studentName: string;
  thesisTitle: string;
  level: string;
  year: string;
  regulationNumber: string;
  implementationNumber: string;
  files: UploadedFile[];
}

interface Award {
  id: number;
  awardName: string;
  organization: string;
  level: string;
  year: string;
  members: Member[];
  regulationNumber: string;
  implementationNumber: string;
  files: UploadedFile[];
}

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "topic" | "article" | "book" | "guidance" | "award"
  >("topic");
  const [showDataView, setShowDataView] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  // Reset department when faculty changes
  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
    setSelectedDepartment(""); // Reset bộ môn khi đổi khoa
  };

  // State for Firebase data
  const [firebaseData, setFirebaseData] = useState<unknown[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load data from Firebase when entering data view
  useEffect(() => {
    if (showDataView) {
      loadDataFromFirebase();
    }
  }, [showDataView]);

  const loadDataFromFirebase = async () => {
    try {
      setIsLoadingData(true);
      const data = await getAllResearchData();
      console.log("📊 Data loaded from Firebase:", data);
      console.log("📊 Number of records:", data.length);
      setFirebaseData(data);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Không thể tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setIsLoadingData(false);
    }
  };

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      name: "",
      type: "",
      members: [{ id: 1, name: "" }],
      experimentType: "",
      regulationNumber: "",
      implementationNumber: "",
      files: [],
    },
  ]);

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "",
      journalTitle: "",
      members: [{ id: 1, name: "" }],
      publisher: "",
      ranking: "",
      issueNumber: "",
      doi: "",
      regulationNumber: "",
      implementationNumber: "",
      files: [],
    },
  ]);

  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "",
      authors: "",
      publisher: "",
      isbn: "",
      publicationYear: "",
      regulationNumber: "",
      implementationNumber: "",
      files: [],
    },
  ]);

  const [guidances, setGuidances] = useState<Guidance[]>([
    {
      id: 1,
      studentName: "",
      thesisTitle: "",
      level: "",
      year: "",
      regulationNumber: "",
      implementationNumber: "",
      files: [],
    },
  ]);

  const [awards, setAwards] = useState<Award[]>([
    {
      id: 1,
      awardName: "",
      organization: "",
      level: "",
      year: "",
      members: [{ id: 1, name: "" }],
      regulationNumber: "",
      implementationNumber: "",
      files: [],
    },
  ]);

  const addTopic = () => {
    setTopics([
      ...topics,
      {
        id: topics.length + 1,
        name: "",
        type: "",
        members: [{ id: 1, name: "" }],
        experimentType: "",
        regulationNumber: "",
        implementationNumber: "",
        files: [],
      },
    ]);
  };

  const removeTopic = (topicId: number) => {
    setTopics(topics.filter((topic) => topic.id !== topicId));
  };

  const addMember = (topicId: number) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            members: [
              ...topic.members,
              { id: topic.members.length + 1, name: "" },
            ],
          };
        }
        return topic;
      })
    );
  };

  const removeMember = (topicId: number, memberId: number) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            members: topic.members.filter((member) => member.id !== memberId),
          };
        }
        return topic;
      })
    );
  };

  const handleFileUpload = (
    topicId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      file: file, // Store File object for later upload
    }));

    setTopics(
      topics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            files: [...topic.files, ...newFiles],
          };
        }
        return topic;
      })
    );
  };

  const removeFile = (topicId: number, fileId: number) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            files: topic.files.filter((file) => file.id !== fileId),
          };
        }
        return topic;
      })
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  // Article functions
  const addArticle = () => {
    setArticles([
      ...articles,
      {
        id: articles.length + 1,
        title: "",
        journalTitle: "",
        members: [{ id: 1, name: "" }],
        publisher: "",
        ranking: "",
        issueNumber: "",
        doi: "",
        regulationNumber: "",
        implementationNumber: "",
        files: [],
      },
    ]);
  };

  const removeArticle = (articleId: number) => {
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  const addArticleMember = (articleId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            members: [
              ...article.members,
              { id: article.members.length + 1, name: "" },
            ],
          };
        }
        return article;
      })
    );
  };

  const removeArticleMember = (articleId: number, memberId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            members: article.members.filter((member) => member.id !== memberId),
          };
        }
        return article;
      })
    );
  };

  const handleArticleFileUpload = (
    articleId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      file: file, // Store File object
    }));

    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            files: [...article.files, ...newFiles],
          };
        }
        return article;
      })
    );
  };

  const removeArticleFile = (articleId: number, fileId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            files: article.files.filter((file) => file.id !== fileId),
          };
        }
        return article;
      })
    );
  };

  // Book, Guidance, Award handlers (simplified for brevity)
  const addBook = () =>
    setBooks([
      ...books,
      {
        id: books.length + 1,
        title: "",
        authors: "",
        publisher: "",
        isbn: "",
        publicationYear: "",
        regulationNumber: "",
        implementationNumber: "",
        files: [],
      },
    ]);
  const removeBook = (id: number) => setBooks(books.filter((b) => b.id !== id));
  const handleBookFileUpload = (
    bookId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: f.size,
      file: f, // Store File object
    }));
    setBooks(
      books.map((b) =>
        b.id === bookId ? { ...b, files: [...b.files, ...newFiles] } : b
      )
    );
  };
  const removeBookFile = (bookId: number, fileId: number) =>
    setBooks(
      books.map((b) =>
        b.id === bookId
          ? { ...b, files: b.files.filter((f) => f.id !== fileId) }
          : b
      )
    );

  const addGuidance = () =>
    setGuidances([
      ...guidances,
      {
        id: guidances.length + 1,
        studentName: "",
        thesisTitle: "",
        level: "",
        year: "",
        regulationNumber: "",
        implementationNumber: "",
        files: [],
      },
    ]);
  const removeGuidance = (id: number) =>
    setGuidances(guidances.filter((g) => g.id !== id));
  const handleGuidanceFileUpload = (
    guidanceId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: f.size,
      file: f, // Store File object
    }));
    setGuidances(
      guidances.map((g) =>
        g.id === guidanceId ? { ...g, files: [...g.files, ...newFiles] } : g
      )
    );
  };
  const removeGuidanceFile = (guidanceId: number, fileId: number) =>
    setGuidances(
      guidances.map((g) =>
        g.id === guidanceId
          ? { ...g, files: g.files.filter((f) => f.id !== fileId) }
          : g
      )
    );

  const addAward = () =>
    setAwards([
      ...awards,
      {
        id: awards.length + 1,
        awardName: "",
        organization: "",
        level: "",
        year: "",
        members: [{ id: 1, name: "" }],
        regulationNumber: "",
        implementationNumber: "",
        files: [],
      },
    ]);
  const removeAward = (id: number) =>
    setAwards(awards.filter((a) => a.id !== id));
  const addAwardMember = (awardId: number) =>
    setAwards(
      awards.map((a) =>
        a.id === awardId
          ? {
              ...a,
              members: [...a.members, { id: a.members.length + 1, name: "" }],
            }
          : a
      )
    );
  const removeAwardMember = (awardId: number, memberId: number) =>
    setAwards(
      awards.map((a) =>
        a.id === awardId
          ? { ...a, members: a.members.filter((m) => m.id !== memberId) }
          : a
      )
    );
  const handleAwardFileUpload = (
    awardId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: f.size,
      file: f, // Store File object
    }));
    setAwards(
      awards.map((a) =>
        a.id === awardId ? { ...a, files: [...a.files, ...newFiles] } : a
      )
    );
  };
  const removeAwardFile = (awardId: number, fileId: number) =>
    setAwards(
      awards.map((a) =>
        a.id === awardId
          ? { ...a, files: a.files.filter((f) => f.id !== fileId) }
          : a
      )
    );

  const handleSave = async () => {
    try {
      // Validation: Kiểm tra thông tin cơ bản
      if (!searchName.trim()) {
        alert("⚠️ Vui lòng nhập Họ và tên!");
        return;
      }
      if (!selectedFaculty) {
        alert("⚠️ Vui lòng chọn Khoa / Trung tâm!");
        return;
      }
      if (!selectedDepartment) {
        alert("⚠️ Vui lòng chọn Bộ môn!");
        return;
      }

      setIsLoading(true);

      // Xác định loại dữ liệu đang lưu
      const type: "topic" | "article" | "book" | "guidance" | "award" =
        activeTab;

      // Lưu files local bằng API route
      const uploadFilesAsync = async (
        files: UploadedFile[],
        uploadPath: string
      ) => {
        const uploadedData = [];
        for (const fileData of files) {
          try {
            if (fileData.file) {
              // Upload file qua API route
              const formData = new FormData();
              formData.append("file", fileData.file);
              formData.append("path", uploadPath);

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              if (response.ok) {
                const result = await response.json();
                uploadedData.push({
                  name: result.name,
                  size: result.size,
                  url: result.url, // Đường dẫn local: /uploads/...
                });
              } else {
                throw new Error("Upload failed");
              }
            } else {
              // Nếu không có File object, chỉ lưu metadata
              uploadedData.push({
                name: fileData.name,
                size: fileData.size,
              });
            }
          } catch (error) {
            console.error("Error uploading file:", error);
            // Vẫn lưu metadata ngay cả khi upload thất bại
            uploadedData.push({
              name: fileData.name,
              size: fileData.size,
              error: "Upload failed",
            });
          }
        }
        return uploadedData;
      };

      // Chuẩn bị dữ liệu theo loại
      let dataToSave: Record<string, unknown> = {};

      if (activeTab === "topic") {
        dataToSave = {
          topics: await Promise.all(
            topics.map(async (topic) => ({
              ...topic,
              files: await uploadFilesAsync(
                topic.files,
                `topics/${searchName}/${topic.id}`
              ),
            }))
          ),
        };
      } else if (activeTab === "article") {
        dataToSave = {
          articles: await Promise.all(
            articles.map(async (article) => ({
              ...article,
              files: await uploadFilesAsync(
                article.files,
                `articles/${searchName}/${article.id}`
              ),
            }))
          ),
        };
      } else if (activeTab === "book") {
        dataToSave = {
          books: await Promise.all(
            books.map(async (book) => ({
              ...book,
              files: await uploadFilesAsync(
                book.files,
                `books/${searchName}/${book.id}`
              ),
            }))
          ),
        };
      } else if (activeTab === "guidance") {
        dataToSave = {
          guidances: await Promise.all(
            guidances.map(async (guidance) => ({
              ...guidance,
              files: await uploadFilesAsync(
                guidance.files,
                `guidances/${searchName}/${guidance.id}`
              ),
            }))
          ),
        };
      } else if (activeTab === "award") {
        dataToSave = {
          awards: await Promise.all(
            awards.map(async (award) => ({
              ...award,
              files: await uploadFilesAsync(
                award.files,
                `awards/${searchName}/${award.id}`
              ),
            }))
          ),
        };
      }

      // Lưu vào Firebase Firestore
      await saveResearchData({
        name: searchName,
        faculty: selectedFaculty,
        department: selectedDepartment,
        type: type,
        data: dataToSave,
      });

      setIsLoading(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      setIsLoading(false);
      alert("Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại!");
    }
  };

  // Prepare combined data for display
  const allData = [
    ...topics.map((topic) => ({
      id: `topic-${topic.id}`,
      type: "topic" as const,
      name: topic.name || "Đề tài 1",
      category: "Đề tài",
      regulationNumber: topic.regulationNumber || "100",
      implementationNumber: topic.implementationNumber || "10",
      files: topic.files,
    })),
    ...articles.map((article) => ({
      id: `article-${article.id}`,
      type: "article" as const,
      name: article.title || "TQU-SLAM benchmark feature-bas...",
      category: "Bài báo",
      regulationNumber: article.regulationNumber || "0",
      implementationNumber: article.implementationNumber || "0",
      files: article.files,
    })),
    ...books.map((book) => ({
      id: `book-${book.id}`,
      type: "book" as const,
      name: book.title || "Tên sách",
      category: "Sách",
      regulationNumber: book.regulationNumber || "0",
      implementationNumber: book.implementationNumber || "0",
      files: book.files,
    })),
  ];

  // Prepare data from Firebase for display
  const prepareFirebaseDataForDisplay = () => {
    console.log("🔄 Preparing data for display...");
    console.log("🔄 Firebase data:", firebaseData);

    const displayData: Array<{
      authorName: string;
      department: string;
      faculty: string;
      activities: Array<{
        id: string;
        type: string;
        name: string;
        category: string;
        regulationNumber: string;
        implementationNumber: string;
        files: Array<{ name: string; size: number; url?: string }>;
      }>;
    }> = [];

    firebaseData.forEach((record: unknown) => {
      const rec = record as {
        name?: string;
        department?: string;
        faculty?: string;
        data?: {
          topics?: unknown[];
          articles?: unknown[];
          books?: unknown[];
          guidances?: unknown[];
          awards?: unknown[];
        };
      };
      console.log("📝 Processing record:", rec);

      const activities: Array<{
        id: string;
        type: string;
        name: string;
        category: string;
        regulationNumber: string;
        implementationNumber: string;
        files: Array<{ name: string; size: number; url?: string }>;
      }> = [];

      // Extract activities from data object
      if (rec.data?.topics) {
        rec.data.topics.forEach((topic: unknown, index: number) => {
          const t = topic as {
            name?: string;
            regulationNumber?: string;
            implementationNumber?: string;
            files?: Array<{ name: string; size: number; url?: string }>;
          };
          activities.push({
            id: `topic-${index}`,
            type: "topic",
            name: t.name || "Đề tài",
            category: "Đề tài",
            regulationNumber: t.regulationNumber || "0",
            implementationNumber: t.implementationNumber || "0",
            files: t.files || [],
          });
        });
      }

      if (rec.data?.articles) {
        rec.data.articles.forEach((article: unknown, index: number) => {
          const a = article as {
            title?: string;
            regulationNumber?: string;
            implementationNumber?: string;
            files?: Array<{ name: string; size: number; url?: string }>;
          };
          activities.push({
            id: `article-${index}`,
            type: "article",
            name: a.title || "Bài báo",
            category: "Bài báo",
            regulationNumber: a.regulationNumber || "0",
            implementationNumber: a.implementationNumber || "0",
            files: a.files || [],
          });
        });
      }

      if (rec.data?.books) {
        rec.data.books.forEach((book: unknown, index: number) => {
          const b = book as {
            title?: string;
            regulationNumber?: string;
            implementationNumber?: string;
            files?: Array<{ name: string; size: number; url?: string }>;
          };
          activities.push({
            id: `book-${index}`,
            type: "book",
            name: b.title || "Sách",
            category: "Sách",
            regulationNumber: b.regulationNumber || "0",
            implementationNumber: b.implementationNumber || "0",
            files: b.files || [],
          });
        });
      }

      if (rec.data?.guidances) {
        rec.data.guidances.forEach((guidance: unknown, index: number) => {
          const g = guidance as {
            thesisTitle?: string;
            regulationNumber?: string;
            implementationNumber?: string;
            files?: Array<{ name: string; size: number; url?: string }>;
          };
          activities.push({
            id: `guidance-${index}`,
            type: "guidance",
            name: g.thesisTitle || "Hướng dẫn",
            category: "Hướng dẫn SV",
            regulationNumber: g.regulationNumber || "0",
            implementationNumber: g.implementationNumber || "0",
            files: g.files || [],
          });
        });
      }

      if (rec.data?.awards) {
        rec.data.awards.forEach((award: unknown, index: number) => {
          const aw = award as {
            awardName?: string;
            regulationNumber?: string;
            implementationNumber?: string;
            files?: Array<{ name: string; size: number; url?: string }>;
          };
          activities.push({
            id: `award-${index}`,
            type: "award",
            name: aw.awardName || "Giải thưởng",
            category: "Giải thưởng",
            regulationNumber: aw.regulationNumber || "0",
            implementationNumber: aw.implementationNumber || "0",
            files: aw.files || [],
          });
        });
      }

      if (activities.length > 0) {
        displayData.push({
          authorName: rec.name || "Chưa có tên",
          department: rec.department || "Chưa có bộ môn",
          faculty: rec.faculty || "Chưa có khoa",
          activities,
        });
      }
    });

    console.log("✅ Final display data:", displayData);
    console.log("✅ Number of items:", displayData.length);
    return displayData;
  };

  const displayData = prepareFirebaseDataForDisplay();

  // Filter display data
  const filteredDisplayData = displayData.filter((item) => {
    const matchName =
      !filterName ||
      item.authorName.toLowerCase().includes(filterName.toLowerCase());
    const matchFaculty = !filterFaculty || item.faculty === filterFaculty;
    const matchDepartment =
      !filterDepartment || item.department === filterDepartment;
    return matchName && matchFaculty && matchDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
              <Image
                src="/dh-tan-trao.png"
                alt="Logo Đại học Tân Trào"
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-black font-bold text-xl">
                UBND TỈNH TUYÊN QUANG
              </h1>
              <h2 className="text-black font-bold text-xl">
                TRƯỜNG ĐẠI HỌC TÂN TRÀO
              </h2>
              <p className="text-black text-lg">PHÒNG QLKH & HỢP TÁC QT</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative w-26 h-26">
              <Image
                src="/vong.png"
                alt="Vòng nguyệt quế"
                width={104}
                height={104}
                className="object-contain"
              />
              <span
                style={{ top: "20px", right: "26px" }}
                className="absolute text-red-600 font-bold text-sm text-center leading-tight"
              >
                CHẤT
                <br />
                LƯỢNG
              </span>
            </div>
            <div className="relative w-26 h-26">
              <Image
                src="/vong.png"
                alt="Vòng nguyệt quế"
                width={104}
                height={104}
                className="object-contain"
              />
              <span
                style={{ top: "20px", right: "30px" }}
                className="absolute text-red-600 font-bold text-sm text-center leading-tight"
              >
                PHÁT
                <br />
                TRIỂN
              </span>
            </div>
            <div className="relative w-26 h-26">
              <Image
                src="/vong.png"
                alt="Vòng nguyệt quế"
                width={104}
                height={104}
                className="object-contain"
              />
              <span
                style={{ top: "20px", right: "30px" }}
                className="absolute text-red-600 font-bold text-sm text-center leading-tight"
              >
                HỘI
                <br />
                NHẬP
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-red-600 text-center mb-10">
          HỆ THỐNG QUẢN LÍ SẢN PHẨM KHOA HỌC
        </h1>
        {/* Submit Button */}
        <div className="flex justify-end my-6">
          <button
            onClick={() => setShowDataView(!showDataView)}
            className="flex items-center gap-2 p-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            {showDataView ? (
              <>
                <X size={20} />
                <span>Quay lại</span>
              </>
            ) : (
              <>
                <Eye size={20} />
                <span>Xem dữ liệu</span>
              </>
            )}
          </button>
        </div>

        {!showDataView ? (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoa / Trung tâm
                  </label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => handleFacultyChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn khoa</option>
                    <option value="cntt">Công nghệ thông tin</option>
                    <option value="kt">Kinh tế</option>
                    <option value="nn">Nông nghiệp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bộ môn
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!selectedFaculty}
                  >
                    <option value="">
                      {selectedFaculty
                        ? "Chọn bộ môn"
                        : "Vui lòng chọn khoa trước"}
                    </option>

                    {/* Bộ môn cho Công nghệ thông tin */}
                    {selectedFaculty === "cntt" && (
                      <>
                        <option value="khmt">Khoa học máy tính</option>
                        <option value="cnpm">Công nghệ phần mềm</option>
                        <option value="httt">Hệ thống thông tin</option>
                        <option value="mmt">Mạng máy tính</option>
                        <option value="ktmt">Kỹ thuật máy tính</option>
                      </>
                    )}

                    {/* Bộ môn cho Kinh tế */}
                    {selectedFaculty === "kt" && (
                      <>
                        <option value="qtkd">Quản trị kinh doanh</option>
                        <option value="kt">Kinh tế</option>
                        <option value="tcnh">Tài chính ngân hàng</option>
                        <option value="ktnn">Kinh tế nông nghiệp</option>
                        <option value="marketing">Marketing</option>
                      </>
                    )}

                    {/* Bộ môn cho Nông nghiệp */}
                    {selectedFaculty === "nn" && (
                      <>
                        <option value="cnsh">Công nghệ sinh học</option>
                        <option value="ktnn">Khoa học cây trồng</option>
                        <option value="chnuoi">Chăn nuôi thú y</option>
                        <option value="tnmt">Tài nguyên môi trường</option>
                        <option value="lamnghiep">Lâm nghiệp</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 animate-fade-in">
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-green-800">Thành công</p>
                      <p className="text-sm text-green-700">
                        Đã lưu thông tin thành công
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-5 bg-[#f2f2f2]">
              <button
                onClick={() => setActiveTab("topic")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                  activeTab === "topic"
                    ? "bg-white text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileText
                  size={24}
                  className={
                    activeTab === "topic"
                      ? "text-gray-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                <span className="text-sm text-center">Đề tài nghiên cứu</span>
              </button>
              <button
                onClick={() => setActiveTab("article")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                  activeTab === "article"
                    ? "bg-white text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Newspaper
                  size={24}
                  className={
                    activeTab === "article"
                      ? "text-gray-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                <span className="text-sm text-center">Bài báo khoa học</span>
              </button>
              <button
                onClick={() => setActiveTab("book")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                  activeTab === "book"
                    ? "bg-white text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <BookOpen
                  size={24}
                  className={
                    activeTab === "book"
                      ? "text-gray-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                <span className="text-sm text-center">Sách/Giáo trình</span>
              </button>
              <button
                onClick={() => setActiveTab("guidance")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                  activeTab === "guidance"
                    ? "bg-white text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <GraduationCap
                  size={24}
                  className={
                    activeTab === "guidance"
                      ? "text-gray-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                <span className="text-sm text-center">Hướng dẫn SV</span>
              </button>
              <button
                onClick={() => setActiveTab("award")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                  activeTab === "award"
                    ? "bg-white text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Award
                  size={24}
                  className={
                    activeTab === "award"
                      ? "text-gray-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                <span className="text-sm text-center">Giải thưởng</span>
              </button>
            </div>

            {/* Topics or Articles Section */}
            {activeTab === "topic" ? (
              <>
                <div className="flex items-center justify-between my-6">
                  <h2 className="text-xl font-semibold text-blue-600">
                    Danh sách đề tài
                  </h2>
                  <button
                    onClick={addTopic}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Thêm đề tài</span>
                  </button>
                </div>

                {/* Topics List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  {topics.map((topic, topicIndex) => (
                    <div key={topic.id} className="mb-8 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-blue-500">
                          Đề tài {topicIndex + 1}
                        </h3>
                        {topics.length > 1 && (
                          <button
                            onClick={() => removeTopic(topic.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên đề tài
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên đề tài"
                            value={topic.name || ""}
                            onChange={(e) =>
                              setTopics(
                                topics.map((t) =>
                                  t.id === topic.id
                                    ? { ...t, name: e.target.value }
                                    : t
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại đề tài
                          </label>
                          <select
                            value={topic.type || ""}
                            onChange={(e) =>
                              setTopics(
                                topics.map((t) =>
                                  t.id === topic.id
                                    ? { ...t, type: e.target.value }
                                    : t
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn loại đề tài</option>
                            <option value="coso">Cơ sở</option>
                            <option value="ungdung">Ứng dụng</option>
                            <option value="phantich">Phân tích</option>
                          </select>
                        </div>
                      </div>

                      {/* Members List */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách thành viên
                          </label>
                          <button
                            onClick={() => addMember(topic.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                          >
                            <Plus size={20} />
                            <span className="text-sm">Thêm thành viên</span>
                          </button>
                        </div>
                        {topic.members.map((member, memberIndex) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              placeholder={`Thành viên ${memberIndex + 1}`}
                              value={member.name || ""}
                              onChange={(e) =>
                                setTopics(
                                  topics.map((t) =>
                                    t.id === topic.id
                                      ? {
                                          ...t,
                                          members: t.members.map((m) =>
                                            m.id === member.id
                                              ? { ...m, name: e.target.value }
                                              : m
                                          ),
                                        }
                                      : t
                                  )
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {topic.members.length > 1 && (
                              <button
                                onClick={() =>
                                  removeMember(topic.id, member.id)
                                }
                                className="text-gray-500 hover:text-red-700 px-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nghiệm thu loại
                          </label>
                          <select
                            value={topic.experimentType || ""}
                            onChange={(e) =>
                              setTopics(
                                topics.map((t) =>
                                  t.id === topic.id
                                    ? { ...t, experimentType: e.target.value }
                                    : t
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn loại</option>
                            <option value="xuat-sac">Xuất sắc</option>
                            <option value="tot">Tốt</option>
                            <option value="dat">Đạt</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết quy đổi
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết quy đổi"
                            value={topic.regulationNumber}
                            onChange={(e) =>
                              setTopics(
                                topics.map((t) =>
                                  t.id === topic.id
                                    ? { ...t, regulationNumber: e.target.value }
                                    : t
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết đã thực hiện
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết đã thực hiện"
                            value={topic.implementationNumber}
                            onChange={(e) =>
                              setTopics(
                                topics.map((t) =>
                                  t.id === topic.id
                                    ? {
                                        ...t,
                                        implementationNumber: e.target.value,
                                      }
                                    : t
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* File Upload Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tài liệu đính kèm
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                            <div className="flex py-3 gap-2 flex-row items-center justify-center">
                              <Upload className="w-4 h-4 text-blue-500" />
                              <p className="text-sm text-blue-600 font-medium">
                                Vui lòng tải lên minh chứng tại đây
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => handleFileUpload(topic.id, e)}
                            />
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {topic.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                              Tài liệu đã chọn:
                            </p>
                            <div className="space-y-2">
                              {topic.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-blue-600 font-medium truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeFile(topic.id, file.id)
                                    }
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Save Button */}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center w-full gap-2 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <span>Lưu thông tin</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : activeTab === "article" ? (
              <>
                <div className="flex items-center justify-between my-6">
                  <h2 className="text-xl font-semibold text-green-600">
                    Danh sách bài báo
                  </h2>
                  <button
                    onClick={addArticle}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Thêm bài báo</span>
                  </button>
                </div>

                {/* Articles List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  {articles.map((article, articleIndex) => (
                    <div key={article.id} className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-500">
                          Bài báo {articleIndex + 1}
                        </h3>
                        {articles.length > 1 && (
                          <button
                            onClick={() => removeArticle(article.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên tác giả chính
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên tác giả chính"
                            value={article.publisher || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, publisher: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Members List */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách thành viên
                          </label>
                          <button
                            onClick={() => addArticleMember(article.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                          >
                            <Plus size={20} />
                            <span className="text-sm">Thêm thành viên</span>
                          </button>
                        </div>
                        {article.members.map((member, memberIndex) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              placeholder={`Thành viên ${memberIndex + 1}`}
                              value={member.name || ""}
                              onChange={(e) =>
                                setArticles(
                                  articles.map((a) =>
                                    a.id === article.id
                                      ? {
                                          ...a,
                                          members: a.members.map((m) =>
                                            m.id === member.id
                                              ? { ...m, name: e.target.value }
                                              : m
                                          ),
                                        }
                                      : a
                                  )
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            {article.members.length > 1 && (
                              <button
                                onClick={() =>
                                  removeArticleMember(article.id, member.id)
                                }
                                className="text-gray-500 hover:text-red-700 px-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên bài báo
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên bài báo"
                            value={article.title || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, title: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xếp hạng tạp chí
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập xếp hạng tạp chí"
                            value={article.ranking || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, ranking: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dấng năm tạp chí
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên tạp chí"
                            value={article.journalTitle || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, journalTitle: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tạp
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tạp"
                            value={article.issueNumber || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, issueNumber: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số DOI
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số DOI"
                            value={article.doi || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, doi: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết quy đổi
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết quy đổi"
                            value={article.regulationNumber || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? { ...a, regulationNumber: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết đã thực hiện
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết đã thực hiện"
                            value={article.implementationNumber || ""}
                            onChange={(e) =>
                              setArticles(
                                articles.map((a) =>
                                  a.id === article.id
                                    ? {
                                        ...a,
                                        implementationNumber: e.target.value,
                                      }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* File Upload Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tài liệu đính kèm
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
                            <div className="flex py-3 gap-2 flex-row items-center justify-center">
                              <Upload className="w-4 h-4 text-green-500" />
                              <p className="text-sm text-green-600 font-medium">
                                Vui lòng tải lên minh chứng tại đây
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) =>
                                handleArticleFileUpload(article.id, e)
                              }
                            />
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {article.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                              Tài liệu đã chọn:
                            </p>
                            <div className="space-y-2">
                              {article.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-5 h-5 text-green-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-green-600 font-medium truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeArticleFile(article.id, file.id)
                                    }
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Save Button */}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex w-full items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <span>Lưu thông tin</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : activeTab === "book" ? (
              <>
                <div className="flex items-center justify-between my-6">
                  <h2 className="text-xl font-semibold text-purple-600">
                    Danh sách sách/giáo trình
                  </h2>
                  <button
                    onClick={addBook}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Thêm sách</span>
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  {books.map((book, idx) => (
                    <div key={book.id} className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-purple-500">
                          Sách/Giáo trình {idx + 1}
                        </h3>
                        {books.length > 1 && (
                          <button
                            onClick={() => removeBook(book.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sách/giáo trình
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên sách"
                            value={book.title || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? { ...b, title: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tác giả
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên tác giả"
                            value={book.authors || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? { ...b, authors: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nhà xuất bản
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập nhà xuất bản"
                            value={book.publisher || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? { ...b, publisher: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Năm xuất bản
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập năm"
                            value={book.publicationYear || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? { ...b, publicationYear: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết quy đổi
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết quy đổi"
                            value={book.regulationNumber || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? { ...b, regulationNumber: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết đã thực hiện
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết đã thực hiện"
                            value={book.implementationNumber || ""}
                            onChange={(e) =>
                              setBooks(
                                books.map((b) =>
                                  b.id === book.id
                                    ? {
                                        ...b,
                                        implementationNumber: e.target.value,
                                      }
                                    : b
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tài liệu đính kèm
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                            <div className="flex py-3 gap-2 flex-row items-center justify-center">
                              <Upload className="w-4 h-4 text-purple-500" />
                              <p className="text-sm text-purple-600 font-medium">
                                Vui lòng tải lên minh chứng tại đây
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => handleBookFileUpload(book.id, e)}
                            />
                          </label>
                        </div>
                        {book.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                              Tài liệu đã chọn:
                            </p>
                            <div className="space-y-2">
                              {book.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-5 h-5 text-purple-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-purple-600 font-medium truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeBookFile(book.id, file.id)
                                    }
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex w-full items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <span>Lưu thông tin</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : activeTab === "guidance" ? (
              <>
                <div className="flex items-center justify-between my-6">
                  <h2 className="text-xl font-semibold text-orange-600">
                    Danh sách hướng dẫn sinh viên
                  </h2>
                  <button
                    onClick={addGuidance}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Thêm hướng dẫn</span>
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  {guidances.map((guidance, idx) => (
                    <div key={guidance.id} className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-orange-500">
                          Hướng dẫn {idx + 1}
                        </h3>
                        {guidances.length > 1 && (
                          <button
                            onClick={() => removeGuidance(guidance.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sinh viên
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên sinh viên"
                            value={guidance.studentName || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? { ...g, studentName: e.target.value }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên đề tài/luận văn
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên đề tài"
                            value={guidance.thesisTitle || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? { ...g, thesisTitle: e.target.value }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cấp độ
                          </label>
                          <select
                            value={guidance.level || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? { ...g, level: e.target.value }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Chọn cấp độ</option>
                            <option value="daihoc">Đại học</option>
                            <option value="thacsi">Thạc sĩ</option>
                            <option value="tiensi">Tiến sĩ</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Năm
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập năm"
                            value={guidance.year || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? { ...g, year: e.target.value }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết quy đổi
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết quy đổi"
                            value={guidance.regulationNumber || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? { ...g, regulationNumber: e.target.value }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết đã thực hiện
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết đã thực hiện"
                            value={guidance.implementationNumber || ""}
                            onChange={(e) =>
                              setGuidances(
                                guidances.map((g) =>
                                  g.id === guidance.id
                                    ? {
                                        ...g,
                                        implementationNumber: e.target.value,
                                      }
                                    : g
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tài liệu đính kèm
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors">
                            <div className="flex py-3 gap-2 flex-row items-center justify-center">
                              <Upload className="w-4 h-4 text-orange-500" />
                              <p className="text-sm text-orange-600 font-medium">
                                Vui lòng tải lên minh chứng tại đây
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) =>
                                handleGuidanceFileUpload(guidance.id, e)
                              }
                            />
                          </label>
                        </div>
                        {guidance.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                              Tài liệu đã chọn:
                            </p>
                            <div className="space-y-2">
                              {guidance.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-5 h-5 text-orange-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-orange-600 font-medium truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeGuidanceFile(guidance.id, file.id)
                                    }
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex w-full items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <span>Lưu thông tin</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between my-6">
                  <h2 className="text-xl font-semibold text-yellow-600">
                    Danh sách giải thưởng
                  </h2>
                  <button
                    onClick={addAward}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Thêm giải thưởng</span>
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  {awards.map((award, idx) => (
                    <div key={award.id} className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-yellow-600">
                          Giải thưởng {idx + 1}
                        </h3>
                        {awards.length > 1 && (
                          <button
                            onClick={() => removeAward(award.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên giải thưởng
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên giải thưởng"
                            value={award.awardName || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? { ...a, awardName: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tổ chức trao
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tổ chức"
                            value={award.organization || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? { ...a, organization: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cấp độ
                          </label>
                          <select
                            value={award.level || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? { ...a, level: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          >
                            <option value="">Chọn cấp độ</option>
                            <option value="quocte">Quốc tế</option>
                            <option value="quocgia">Quốc gia</option>
                            <option value="bo">Bộ</option>
                            <option value="truong">Trường</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Năm
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập năm"
                            value={award.year || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? { ...a, year: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách thành viên
                          </label>
                          <button
                            onClick={() => addAwardMember(award.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                          >
                            <Plus size={20} />
                            <span className="text-sm">Thêm thành viên</span>
                          </button>
                        </div>
                        {award.members.map((member, memberIndex) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              placeholder={`Thành viên ${memberIndex + 1}`}
                              value={member.name || ""}
                              onChange={(e) =>
                                setAwards(
                                  awards.map((a) =>
                                    a.id === award.id
                                      ? {
                                          ...a,
                                          members: a.members.map((m) =>
                                            m.id === member.id
                                              ? { ...m, name: e.target.value }
                                              : m
                                          ),
                                        }
                                      : a
                                  )
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                            {award.members.length > 1 && (
                              <button
                                onClick={() =>
                                  removeAwardMember(award.id, member.id)
                                }
                                className="text-gray-500 hover:text-red-700 px-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết quy đổi
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết quy đổi"
                            value={award.regulationNumber || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? { ...a, regulationNumber: e.target.value }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiết đã thực hiện
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập số tiết đã thực hiện"
                            value={award.implementationNumber || ""}
                            onChange={(e) =>
                              setAwards(
                                awards.map((a) =>
                                  a.id === award.id
                                    ? {
                                        ...a,
                                        implementationNumber: e.target.value,
                                      }
                                    : a
                                )
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tài liệu đính kèm
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition-colors">
                            <div className="flex py-3 gap-2 flex-row items-center justify-center">
                              <Upload className="w-4 h-4 text-yellow-600" />
                              <p className="text-sm text-yellow-700 font-medium">
                                Vui lòng tải lên minh chứng tại đây
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) =>
                                handleAwardFileUpload(award.id, e)
                              }
                            />
                          </label>
                        </div>
                        {award.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                              Tài liệu đã chọn:
                            </p>
                            <div className="space-y-2">
                              {award.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-5 h-5 text-yellow-600 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-yellow-700 font-medium truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeAwardFile(award.id, file.id)
                                    }
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex w-full items-center gap-2 px-8 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:bg-yellow-400 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <span>Lưu thông tin</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* Data View Page */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoa
                  </label>
                  <select
                    value={filterFaculty}
                    onChange={(e) => setFilterFaculty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="">Tất cả khoa</option>
                    <option value="cntt">Công nghệ thông tin</option>
                    <option value="kt">Kinh tế</option>
                    <option value="nn">Nông nghiệp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bộ môn
                  </label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="">Tất cả bộ môn</option>
                    <option value="httt">Hệ thống thông tin</option>
                    <option value="ktpm">Kỹ thuật phần mềm</option>
                    <option value="mmttt">Mạng máy tính</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tìm kiếm
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Hiếu"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xuất dữ liệu
                  </label>
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors text-sm">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Xuất Excel bộ môn</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      <span>Tải file bộ môn</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                      <Download className="w-4 h-4" />
                      <span>Tải tất cả file</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {isLoadingData ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
                  <span className="ml-3 text-gray-600">
                    Đang tải dữ liệu...
                  </span>
                </div>
              ) : filteredDisplayData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Chưa có dữ liệu</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Vui lòng nhập và lưu dữ liệu trước
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Họ tên
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Bộ môn
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Tên hoạt động
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Loại
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Số tiết quy đổi
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                          Số tiết đã thực hiện
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                          Minh chứng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Display data from Firebase */}
                      {filteredDisplayData.map((author, authorIndex) =>
                        author.activities.map((activity, activityIndex) => (
                          <tr
                            key={`${authorIndex}-${activityIndex}`}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            {/* Author name and department - only show in first row */}
                            {activityIndex === 0 && (
                              <>
                                <td
                                  className="px-4 py-4 text-sm"
                                  rowSpan={author.activities.length}
                                >
                                  <button className="text-blue-600 hover:underline flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    <span className="font-medium">
                                      {author.authorName}
                                    </span>
                                  </button>
                                </td>
                                <td
                                  className="px-4 py-4 text-sm"
                                  rowSpan={author.activities.length}
                                >
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                    {author.department}
                                  </span>
                                </td>
                              </>
                            )}
                            {/* Activity details */}
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {activity.name}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  activity.type === "topic"
                                    ? "bg-blue-100 text-blue-700"
                                    : activity.type === "article"
                                    ? "bg-green-100 text-green-700"
                                    : activity.type === "book"
                                    ? "bg-purple-100 text-purple-700"
                                    : activity.type === "guidance"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {activity.category}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center justify-center w-12 h-7 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                {activity.regulationNumber}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center justify-center w-12 h-7 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                {activity.implementationNumber}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex gap-2 justify-center">
                                {activity.files && activity.files.length > 0 ? (
                                  activity.files.slice(0, 2).map(
                                    (
                                      file: {
                                        name: string;
                                        size: number;
                                        url?: string;
                                      },
                                      idx: number
                                    ) => (
                                      <a
                                        key={idx}
                                        href={file.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={file.name}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs"
                                        title={file.name}
                                      >
                                        <FileText className="w-4 h-4" />
                                        <span>
                                          {file.name.substring(0, 8)}...
                                        </span>
                                      </a>
                                    )
                                  )
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    Không có file
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
