const handleError = (error, message) => {
    console.error('Error:', error);
    throw new Error(message);
}

export {
    handleError
}