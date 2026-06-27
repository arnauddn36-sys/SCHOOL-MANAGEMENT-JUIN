export function canViewStudents(user) {
    return hasRole(user, ["admin", "teacher"]);
}

export function canEditStudents(user) {
    return hasRole(user, ["admin"]);
}

export function canViewGrades(user) {
    return hasRole(user, ["admin", "teacher"]);
}

export function canEditGrades(user) {
    return hasRole(user, ["admin", "teacher"]);
}

export function canViewStats(user) {
    return hasRole(user, ["admin"]);
}

export function canManageAbsences(user) {
    return hasRole(user, ["admin", "teacher"]);
}

function hasRole(user, roles) {
    return user && roles.includes(user.role);
}


//cette fonction me permet de donner accès a tel utiliateur