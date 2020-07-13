/* eslint-disable func-names */

import mongoose from 'mongoose'

// import { isPermissionEnum } from '@helpers/validators'

export type PermissionDocument = mongoose.Document & {
  isGroup: boolean;
  name: string;
  validSubtypes?: string[];
  children?: string[];
}

const PermissionSchema = new mongoose.Schema(
  {
    isGroup: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    permissionLevel: {
      type: Number,
      required: false
    },
    children: {
      type: Array,
      required: false
    }
  }
)

const Permission = mongoose.model<PermissionDocument>('Permission', PermissionSchema)

export default Permission
