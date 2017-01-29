/* eslint-disable */
export function format (incoming) {
			var content = incoming;
			for (var i = 1; i < arguments.length; i++) {
						var replacement = '{' + (i - 1) + '}';
						content = content.replace(replacement, arguments[i]);
			}
			return content;
}