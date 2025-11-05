// Utilitaire pour convertir les URLs MinIO Docker en URLs localhost
// Utiliser dans votre frontend ou pour tester

/**
 * Convertit une URL MinIO Docker en URL accessible depuis le navigateur
 * @param url - URL MinIO (peut contenir 'minio' ou 'localhost')
 * @returns URL accessible depuis le navigateur
 */
export function convertMinioUrl(url: string): string {
  if (!url) return url;
  
  // Remplacer le hostname 'minio' par 'localhost'
  return url.replace(/http:\/\/minio:/g, 'http://localhost:');
}

/**
 * Extrait le nom de l'objet d'une URL MinIO
 * @param url - URL complète MinIO
 * @returns Nom de l'objet (ex: "userId/timestamp-filename.ext")
 */
export function extractObjectName(url: string): string | null {
  if (!url) return null;
  
  // Pattern: http(s)://hostname:port/bucket/objectName
  const match = url.match(/https?:\/\/[^/]+\/[^/]+\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Extrait le nom du fichier d'une URL MinIO
 * @param url - URL complète MinIO
 * @returns Nom du fichier uniquement
 */
export function extractFileName(url: string): string | null {
  const objectName = extractObjectName(url);
  if (!objectName) return null;
  
  // Retirer le pattern userId/timestamp-
  const match = objectName.match(/[^/]+\/\d+-(.+)$/);
  return match ? match[1] : objectName.split('/').pop() || null;
}

// Exemples d'utilisation :

// Exemple 1: Convertir URL Docker en URL locale
const dockerUrl = 'http://minio:9000/documents/user123/1730400000000-report.pdf';
const browserUrl = convertMinioUrl(dockerUrl);
console.log(browserUrl);
// Output: http://localhost:9000/documents/user123/1730400000000-report.pdf

// Exemple 2: Extraire le nom de l'objet
const objectName = extractObjectName(dockerUrl);
console.log(objectName);
// Output: user123/1730400000000-report.pdf

// Exemple 3: Extraire le nom du fichier
const fileName = extractFileName(dockerUrl);
console.log(fileName);
// Output: report.pdf

// Exemple 4: Utilisation dans React
/*
function DocumentLink({ url, children }) {
  const accessibleUrl = convertMinioUrl(url);
  const fileName = extractFileName(url);
  
  return (
    <a href={accessibleUrl} download={fileName} target="_blank" rel="noopener noreferrer">
      {children || fileName}
    </a>
  );
}
*/

// Exemple 5: Batch conversion pour une liste de documents
/*
const documents = [
  { id: '1', name: 'Doc 1', url: 'http://minio:9000/documents/user/file1.pdf' },
  { id: '2', name: 'Doc 2', url: 'http://minio:9000/documents/user/file2.pdf' },
];

const accessibleDocuments = documents.map(doc => ({
  ...doc,
  url: convertMinioUrl(doc.url)
}));
*/
