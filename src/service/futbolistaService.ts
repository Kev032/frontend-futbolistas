import { Futbolista } from "../model/Futbolista";

const API_URL = 'http://localhost:8080/futbolista';

export const getFutbolistas = async (page: number, size: number): Promise<Futbolista[]> => {
  const response = await fetch(`${API_URL}?page=${page}&size=${size}`);
  if (!response.ok) {
    throw new Error('Error fetching futbolistas');
  }
  const data = await response.json();
  return data.content;
};

export const getFutbolistaById = async (id: number): Promise<Futbolista> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Error fetching futbolista');
  }
  const data = await response.json();
  return data;
};

export const updateFutbolista = async (id: number, futbolista: Futbolista): Promise<Futbolista> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(futbolista)
  });
  if (!response.ok) {
    throw new Error('Error updating futbolista');
  }
  const data = await response.json();
  return data;
};