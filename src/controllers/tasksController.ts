import { RequestHandler } from "express";
import { Priority, Status, Tasks } from "../models/tasks.model";
export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = await Tasks.create({
      title,
      description,
      status,
      priority,
    });
    return res.status(201).json({
      message: "task created successfully",
      data: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get
export const showTasks: RequestHandler = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "asc",
    } = req.paresedQuery ?? {};
    const filter: {
      status?: Status;
      priority?: Priority;
      $or?: Array<
        | { title: { $regex: string; $options: string } }
        | { description: { $regex: string; $options: string } }
      >;
    } = {};

    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }

    const skip = (page - 1) * limit;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const sortOrder = order === "asc" ? 1 : -1;
    const [tasks, totalTasks] = await Promise.all([
      Tasks.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ [sort]: sortOrder })
        .lean(),
      Tasks.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    return res.status(200).json({
      data: tasks,
      pagination: {
        page: page,
        limit: limit,
        skip: skip,
        totalPages: totalPages,
        totalTasks: totalTasks,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
// getbyid

export const singleTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id).lean();
    if (!task) {
      return res.status(404).json({
        message: "task is not found",
      });
    }
    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// edit
export const editTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    const task = await Tasks.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!task) {
      return res.status(404).json({
        message: "task is not found",
      });
    }
    return res.status(200).json({
      message: "Task is updated successfully",
      data: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// edit part of task
export const editPartialy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const updateData: {
      status?: "To-Do" | "In-Progress" | "Done";
      priority?: "Low" | "Medium" | "High";
    } = {};

    if (status !== undefined) {
      updateData.status = status;
    }
    if (priority !== undefined) {
      updateData.priority = priority;
    }
    const task = await Tasks.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task is not found",
      });
    }

    return res.status(200).json({
      message: "Status and priority are updated successfully",
      data: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// delete
export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        message: "task is not found",
      });
    }
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
