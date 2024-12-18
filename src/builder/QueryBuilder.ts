/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  public constructor(
    modelQuery: Query<T[], T>,
    query: Record<string, unknown>,
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /**
   * Applies a search filter to the query based on searchable fields.
   */
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string | undefined;
    if (searchTerm && searchableFields.length > 0) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  /**
   * Filters query parameters, including handling operators like gte and lte.
   */
  filter() {
    const queryObj = { ...this.query };
    const excludingFields = [
      'searchTerm',
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'fields',
    ];
    excludingFields.forEach((field) => delete queryObj[field]);

    // Process nested filtering for operators (e.g., gte, lte)
    const advancedFilters: Record<string, any> = {};
    for (const [key, value] of Object.entries(queryObj)) {
      if (typeof value === 'object' && value !== null) {
        // Transform nested operators into Mongoose-compatible syntax
        advancedFilters[key] = {};
        for (const [operator, val] of Object.entries(value)) {
          advancedFilters[key][`$${operator}`] = Number(val); // Convert to number
        }
      } else {
        advancedFilters[key] = value;
      }
    }

    this.modelQuery = this.modelQuery.find(advancedFilters as FilterQuery<T>);
    return this;
  }

  /**
   * Adds pagination to the query.
   */
  paginate() {
    const page = Math.max(Number(this.query?.page) || 1, 1);
    const limit = Math.max(Number(this.query?.limit) || 10, 1);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /**
   * Sorts the query based on provided fields and order.
   */
  sort() {
    const sortBy = this.query?.sortBy as string | undefined;
    const sortOrder = this.query?.sortOrder as string | undefined;

    if (sortBy) {
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortStr);
    }
    return this;
  }

  /**
   * Selects specific fields to include or exclude from the result.
   */
  fields() {
    const fields = (this.query?.fields as string)?.split(',').join(' ') || '';
    const defaultFields = '-__v'; // Exclude versioning by default

    this.modelQuery = this.modelQuery.select(fields || defaultFields);
    return this;
  }
}

export default QueryBuilder;
