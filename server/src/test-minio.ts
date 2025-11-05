// Script de test pour vérifier l'intégration MinIO
// Exécutez avec: npx ts-node src/test-minio.ts

import { minioClient, ensureBucket, getBucketName } from './shared/minioClient';
import * as dotenv from 'dotenv';

dotenv.config();

async function testMinioConnection() {
  console.log('🔍 Test de connexion MinIO...\n');

  try {
    // Test 1: Connexion au serveur MinIO
    console.log('1. Test de connexion au serveur MinIO...');
    const buckets = await minioClient.listBuckets();
    console.log('   ✅ Connexion réussie!');
    console.log(`   📦 Buckets existants: ${buckets.map(b => b.name).join(', ') || 'aucun'}\n`);

    // Test 2: Création du bucket documents
    console.log('2. Test de création/vérification du bucket...');
    await ensureBucket();
    const bucketName = getBucketName();
    console.log(`   ✅ Bucket '${bucketName}' prêt!\n`);

    // Test 3: Upload d'un fichier de test
    console.log('3. Test d\'upload d\'un fichier...');
    const testContent = 'Ceci est un fichier de test MinIO';
    const testFileName = `test-${Date.now()}.txt`;
    
    await minioClient.putObject(
      bucketName,
      testFileName,
      Buffer.from(testContent),
      {
        'Content-Type': 'text/plain'
      }
    );
    console.log(`   ✅ Fichier '${testFileName}' uploadé avec succès!\n`);

    // Test 4: Vérification de l'existence du fichier
    console.log('4. Test de vérification du fichier...');
    const stats = await minioClient.statObject(bucketName, testFileName);
    console.log(`   ✅ Fichier trouvé!`);
    console.log(`   📊 Taille: ${stats.size} octets`);
    console.log(`   📅 Date: ${stats.lastModified}\n`);

    // Test 5: Génération d'une URL presigned
    console.log('5. Test de génération d\'URL presigned...');
    const url = await minioClient.presignedGetObject(bucketName, testFileName, 24 * 60 * 60);
    console.log(`   ✅ URL générée!`);
    console.log(`   🔗 ${url.substring(0, 80)}...\n`);

    // Test 6: Suppression du fichier de test
    console.log('6. Nettoyage du fichier de test...');
    await minioClient.removeObject(bucketName, testFileName);
    console.log(`   ✅ Fichier de test supprimé!\n`);

    console.log('🎉 Tous les tests sont passés avec succès!');
    console.log('\n✨ MinIO est prêt à être utilisé avec le module document!');

  } catch (error) {
    console.error('\n❌ Erreur lors des tests MinIO:', error);
    console.error('\n💡 Vérifiez que:');
    console.error('   - MinIO est démarré (docker compose up -d)');
    console.error('   - Les variables d\'environnement sont correctes dans .env');
    console.error('   - Le port 9000 est accessible');
    process.exit(1);
  }
}

// Exécuter les tests
testMinioConnection();
