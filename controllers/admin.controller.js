import Admin from '../models/admin';
import { extractError } from "../utils";

export function getAllAdmin(req, res, next) {
  Admin.getAll((err, admin) => {
    if (err) {
      req.errors = err;
      req.data = [];
    } else {
      req.data = admin;
    }
    next();
  });
}

export function getAdmin(req, res, next) {
  Admin.get(req.params.id, (err, admin) => {
    if (err) {
      req.errors = err;
    } else {
      req.data = admin;
    }
    next();
  });
}

export function addAdmin(req, res, next) {
  const reqAdmin = req.body.admin;
  const admin = new Admin({
    username: reqAdmin.username,
    password: reqAdmin.password,
    role: reqAdmin.role,
  });
  Admin.add(admin, (err, admin) => {
    if (err) {
      req.errors = extractError(err);
    } else {
    }
    next();
  });
}

export function authenticate(req, res, next) {
  const reqAdmin = req.body.admin;
  const admin = new Admin({
    username: reqAdmin.username,
    password: reqAdmin.password,
  });
  Admin.authenticate(admin, (err, admin) => {
    if (err) {
      req.errors = extractError(err);
    } else {
      if (admin) {
        req.data = admin.role.name;
      } else {
        req.data = 'Not exist';
      }
    }
    next();
  });
}

export function updateAdmin(req, res, next) {
  const admin = req.body.admin;
  Admin.authenticate(admin, (err, valid) => {
    if (err) {
      req.errors = err;
    } else {
      if (valid) {
        let putAdmin = {};
        admin.username && admin.username !== valid.username ? putAdmin['username'] = admin.username : null;
        admin.newPassword ? putAdmin['password'] = admin.newPassword : null;
        putAdmin['role'] = admin.role;
        Admin.put(admin.id, putAdmin, (err, a) => {
          if (err) {
            req.errors = extractError(err, { password: 'newPassword' });
          }
          next();
        });
      } else {
        req.errors = [{ password: 'Wrong password' }];
        next();
      }
    }
  });
}

export function deleteAdmin(req, res, next) {
  const admin = req.body.admin;
  Admin.delete(admin.id, (err, admin) => {
    if (err) {
      console.log(err);
      req.errors = [{ action: 'Incomplete' }];
    }
    next();
  });
}

export function deactiveAdmin(req, res, next) {
  const admin = req.body.admin;
  Admin.deactive(admin.id, (err) => {
    if (err) {
      req.errors = [{ action: 'Incomplete' }];
    }
    next();
  });
}
export function reactiveAdmin(req, res, next) {
  const admin = req.body.admin;
  Admin.reactive(admin.id, (err) => {
    if (err) {
      req.errors = [{ action: 'Incomplete' }];
    }
    next();
  });
}