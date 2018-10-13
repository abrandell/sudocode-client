/**
 * A class for a project without ID and User fields.
 *
 * Suitable as a project post-form as well as a model for filtering via REST calls.
 */
export class ProjectCreation {

  constructor(
    public title: string,
    public difficulty: string,
    public description: string) {}
}
