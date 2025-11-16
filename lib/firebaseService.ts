import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

// Interface cho dữ liệu
interface ResearchData {
  name: string;
  faculty: string;
  department: string;
  type: 'topic' | 'article' | 'book' | 'guidance' | 'award';
  data: Record<string, unknown>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Upload file lên Firebase Storage
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    
    // Upload với metadata để có thể access
    const metadata = {
      contentType: file.type,
      customMetadata: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Xóa file từ Firebase Storage
export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Lưu dữ liệu vào Firestore
export async function saveResearchData(data: Omit<ResearchData, 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'research'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Cập nhật dữ liệu trong Firestore
export async function updateResearchData(id: string, data: Partial<ResearchData>): Promise<void> {
  try {
    const docRef = doc(db, 'research', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Xóa dữ liệu từ Firestore
export async function deleteResearchData(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'research', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

// Lấy tất cả dữ liệu
export async function getAllResearchData(): Promise<ResearchData[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'research'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as ResearchData[];
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
}

// Lấy dữ liệu theo bộ lọc
export async function getFilteredResearchData(filters: {
  name?: string;
  faculty?: string;
  department?: string;
  type?: string;
}): Promise<ResearchData[]> {
  try {
    let q = query(collection(db, 'research'));
    
    if (filters.name) {
      q = query(q, where('name', '==', filters.name));
    }
    if (filters.faculty) {
      q = query(q, where('faculty', '==', filters.faculty));
    }
    if (filters.department) {
      q = query(q, where('department', '==', filters.department));
    }
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as ResearchData[];
  } catch (error) {
    console.error('Error getting filtered data:', error);
    throw error;
  }
}
