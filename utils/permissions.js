// Vérifie si l'utilisateur peut voir la liste des étudiants
export function canViewStudents(user) {
    // autorisé si admin ou teacher
    return ["admin", "teacher"].includes(user.role);
}

// Vérifie si l'utilisateur peut modifier les étudiants
export function canEditStudents(user) {
    // uniquement admin autorisé
    return user.role === "admin";
}

// Vérifie si l'utilisateur peut voir les notes
export function canViewGrades(user) {
    // admin et teacher autorisés
    return ["admin", "teacher"].includes(user.role);
}

// Vérifie si l'utilisateur peut modifier les notes
export function canEditGrades(user) {
    // admin et teacher autorisés
    return user.role === "teacher" || user.role === "admin";
}

// Vérifie si l'utilisateur peut voir les statistiques
export function canViewStats(user) {
    // uniquement admin autorisé
    return user.role === "admin";
}

// Vérifie si l'utilisateur peut gérer les absences
export function canManageAbsences(user) {
    // tout le monde sauf student
    return user.role !== "student";
}