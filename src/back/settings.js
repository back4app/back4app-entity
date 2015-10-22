/**
 * Contains all settings needed by the {@link module:back4app/entity} module.
 * @module back4app/entity/settings
 */
module.exports = {};

/**
 * Constant with the path to the adapters dictionary. It will be
 * used to find the adapters always that one of them is referenced in the code.
 * @type {!Object.<!string, module:back4app/entity/adapters.Adapter>}
 * @example
 * settings.ADAPTERS = {
 *   default: new MyAdapter(myConfig)
 * };
 */
module.exports.ADAPTERS = {};
