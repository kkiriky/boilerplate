# Firebase

```
  const POSTS_COLLECNTION_NAME = 'posts';
  const postsCollection = collection(db, POSTS_COLLECNTION_NAME);
```

- GET List
  => **query**, **getDocs**

```
  const q = query(postsCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post;
```

- GET One
  => **getDoc**

```
  const docRef = doc(db, POSTS_COLLECNTION_NAME, postId);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data() as Post;
```

- Count
  => **getCount**

```
  const querySnapshot = await getCount(postsCollection);
  return querySnapshot.data();
```

- POST
  => **addDoc**

```
  await addDoc(postsCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
```

- PUT/PATCH
  => **updateDoc**

```
  const docRef = doc(db, POSTS_COLLECNTION_NAME, id);
  await updateDoc(docRef, data as Record<string, any>);
```

- DELETE
  => **deleteDoc**

```
  const docRef = doc(db, POSTS_COLLECNTION_NAME, formId);
  await deleteDoc(docRef);
```

- Upload Image
  => **ref**, **uploadBytes**, **getDownloadURL**

```
export const uploadImage = async (file: File) => {
  const ext = file.name.split('.').pop();
  const storageRef = ref(storage, `/images/${uuidV4()}.${ext}`);

  const result = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(result.ref);

  return url;
};
```

- Delete Image
  => **ref**, **deleteObject**

```
export const deleteImage = async (filename: string) => {
  const storageRef = ref(storage, `/images/${filename}`);
  await deleteObject(storageRef);
};
```

---

# Firebase Admin (Chaining Operator)

```
  const POSTS_COLLECNTION_NAME = 'posts';
  const postsCollection = firestoreAdmin.collection(POSTS_COLLECNTION_NAME);
```

- GET paginated list
  => **get**

```
  const querySnapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .offset(offset)
    .limit(limit)
    .get();

  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
```
