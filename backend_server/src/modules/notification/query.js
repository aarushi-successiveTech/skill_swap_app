export const notificationQueryResolvers = {
    notifications: async() => {
        return [{id: "1", message: "welcome", createdAt: new Date().toISOString()}]; 
    }, 
}