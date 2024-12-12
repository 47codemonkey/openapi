import { atom } from 'jotai';
import { OpenApiDataTypes } from '../types/OpenApiTypes';

export const openApiDataAtom = atom<OpenApiDataTypes | null>(null);
export const errorAtom = atom<string | null>(null);
export const yamlTextAtom = atom<string>('');
