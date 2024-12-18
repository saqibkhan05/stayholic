import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const DocumentUploader = ({ documents }) => {

    const [docs, setDocs] = useState([]);

    // Initialize the document state from the provided documents prop
    useEffect(() => {
        const formattedDocuments = documents.map(doc => ({
            id: doc.id,
            name: doc.name,
            fileUri: 'https://stayholic.com/public/storage/' + doc.docs || null, // Use the existing document URI or null if not uploaded
            fileName: doc.docs ? doc.docs.split('/').pop() : null, // Extract file name from the URI
            isSubmitted: doc.status === 1 // Assuming status 1 means submitted
        }));
        setDocs(formattedDocuments);
    }, [documents]);

    // Handle image selection
    const selectImage = async (docId) => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                updateDocument(docId, selectedImage.uri, selectedImage.fileName);
            } else {
                Alert.alert('Error', 'No image was selected. Please try again.');
            }
        } catch (error) {
            console.error('Error selecting image', error);
            Alert.alert('Error', 'Failed to select image. Please try again.');
        }
    };

    const updateDocument = (docId, fileUri, fileName) => {
        setDocs((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === docId ? { ...doc, fileUri, fileName, isSubmitted: false } : doc
            )
        );
    };

    const uploadDocument = async (docId) => {
        const document = docs.find((doc) => doc.id === docId);
        if (!document.fileUri) {
            Alert.alert("Error", "Please select an image before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append('docs', {
            uri: document.fileUri,
            type: 'image/jpeg',
            name: document.fileName,
        });
        formData.append('id', docId); // Assuming `docId` corresponds to the document's PK in your database

        try {
            const response = await axios.post('https://stayholic.com/api/v1/upload_my_kyc', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 200) {
                updateSubmissionStatus(docId, true);
                Alert.alert("Success", "Document uploaded successfully.");
            }
        } catch (error) {
            console.error("Error uploading document", error);
            Alert.alert("Error", "Failed to upload document.");
        }
    };

    const updateSubmissionStatus = (docId, status) => {
        setDocs((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === docId ? { ...doc, isSubmitted: status } : doc
            )
        );
    };

    return (
        <View style={styles.container}>
            {docs.map((doc) => (
                <View key={doc.id} style={styles.documentContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.documentName}>{doc.name}</Text>
                        <Text style={doc.isSubmitted ? styles.submitted : styles.notSubmitted}>
                            {doc.fileUri ? "Submitted" : "Not Submitted"}
                        </Text>
                        <Text style={doc.isSubmitted ? styles.submitted : styles.notSubmitted}>
                            {doc.isSubmitted ? "Verified" : "Not Verified"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => selectImage(doc.id)}
                        style={styles.selectButton}
                        disabled={doc.isSubmitted}
                    >
                        <Text style={styles.selectButtonText}>Select Image</Text>
                    </TouchableOpacity>

                    {/* Display selected image or placeholder text */}
                    {
                        doc.fileUri ? (
                            <Image source={{ uri: doc.fileUri }} style={styles.selectedImage} />
                        ) : (
                            <Text style={styles.noFileText}>No image selected</Text>
                        )
                    }

                    <TouchableOpacity
                        onPress={() => uploadDocument(doc.id)}
                        style={[styles.submitButton, doc.isSubmitted && styles.disabledButton]}
                        disabled={doc.isSubmitted}
                    >
                        <Text style={styles.submitButtonText}>Upload</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#121212',  // Dark background color
    },
    documentContainer: {
        backgroundColor: '#1f1f1f',  // Dark card background
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    infoContainer: {
        marginBottom: 12,
    },
    documentName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',  // Light text color
    },
    submitted: {
        fontSize: 14,
        color: '#fff',
    },
    notSubmitted: {
        fontSize: 14,
        color: '#fff',
    },
    selectButton: {
        backgroundColor: '#333',  // Dark select button
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        fontSize: 16,
        color: '#fff',  // Light text color
    },
    selectedImage: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        marginVertical: 8,
    },
    noFileText: {
        fontSize: 14,
        color: '#aaa',
        marginVertical: 8,
    },
    submitButton: {
        backgroundColor: '#000',  // Button color
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 16,
        color: '#fff',  // Light text color
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#555',  // Disabled button color
    },
});

export default DocumentUploader;
