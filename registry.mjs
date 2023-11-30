import { addSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import Jasmine from 'jasmine';
import { fileURLToPath, pathToFileURL } from 'url';
import { General } from './lib/general.mjs';
import { Import } from './lib/import.mjs';
import { Reflection } from './lib/reflection.mjs';
import { Security } from './lib/security.mjs';
import { Specs } from './lib/specs.mjs';

const general = new General();
const importExtended = new Import();
const security = new Security();
const reflection = new Reflection();
const { walkDir } = general;

export { Member } from './lib/member.mjs';
export { EventEmitter } from 'events';
export { Buffer } from 'node:buffer';
export { constants, createHmac, generateKeyPairSync, privateDecrypt, publicEncrypt, randomBytes, randomUUID } from 'node:crypto';
export { existsSync, lstatSync, readFileSync, readdirSync, statSync } from 'node:fs';
export { basename, join, resolve } from 'node:path';
export { Member } from './lib/member.mjs';

const baseUrl = import.meta.url;
const currentDir = fileURLToPath(new URL('./', baseUrl));

export { Jasmine, Specs, addSchema, currentDir, fileURLToPath, general, importExtended, pathToFileURL, reflection, security, validate, walkDir };

