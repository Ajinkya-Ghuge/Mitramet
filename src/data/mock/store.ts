import { mockApplications, mockInstruments } from './index';
import type { Application, Instrument } from '../../types';

// Simple in-memory / localStorage store for reactive prototype updates
const STORAGE_KEY_APPS = 'legalmetrix_mock_applications';
const STORAGE_KEY_INSTS = 'legalmetrix_mock_instruments';

export function getApplications(): Application[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_APPS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load applications from localStorage', e);
  }
  return [...mockApplications];
}

export function saveApplication(newApp: Application): Application[] {
  const current = getApplications();
  const updated = [newApp, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save application to localStorage', e);
  }
  return updated;
}

export function getInstruments(): Instrument[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_INSTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load instruments from localStorage', e);
  }
  return [...mockInstruments];
}

export function saveInstrument(newInst: Instrument): Instrument[] {
  const current = getInstruments();
  const updated = [newInst, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_INSTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save instrument to localStorage', e);
  }
  return updated;
}
