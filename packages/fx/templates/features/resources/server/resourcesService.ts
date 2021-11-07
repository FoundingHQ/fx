import { prisma } from "@server/prisma";
import { Prisma } from "@prisma/client";

const defaultSelect = {
  id: true,
};

type CreateResourceInput = {
  id?: string;
  name?: string;
};

export const createResource = async ({ name }: CreateResourceInput) => {
  const data: Prisma.ResourceCreateInput = { name };
  return prisma.resource.create({
    data,
    select: defaultSelect,
  });
};

type GetResourceInput = {
  id?: string;
  email?: string;
};

export const getResource = async ({ id }: GetResourceInput) => {
  const where = { id };

  return prisma.resource.findUnique({
    where,
    select: defaultSelect,
  });
};

export const getResources = async () => {
  return prisma.user.findMany({ select: defaultSelect });
};

interface UpdateResourceInput {
  resourceId: string;
  resourceInput: CreateResourceInput;
}

export const updateEngagement = async ({
  resourceId,
  resourceInput,
}: UpdateResourceInput) => {
  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });

  const { name } = resourceInput;
  return prisma.resource.update({
    where: { id: resourceId },
    data: { name },
  });
};

interface DeleteEngagementInput {
  resourceId: string;
}

export const deleteEngagement = async ({
  resourceId,
}: DeleteEngagementInput) => {
  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });

  return prisma.resource.delete({
    where: { id: resourceId },
  });
};
