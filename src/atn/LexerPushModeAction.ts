﻿/*
 * [The "BSD license"]
 *  Copyright (c) 2013 Terence Parr
 *  Copyright (c) 2013 Sam Harwell
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *  1. Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *  3. The name of the author may not be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 *  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ConvertTo-TS run at 2016-10-04T11:26:30.1378801-07:00

import { Lexer } from '../Lexer';
import { LexerAction } from './LexerAction';
import { LexerActionType } from './LexerActionType';
import { MurmurHash } from '../misc/MurmurHash';
import { NotNull, Override } from '../Decorators';

/**
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer#pushMode} with the assigned mode.
 *
 * @author Sam Harwell
 * @since 4.2
 */
export class LexerPushModeAction implements LexerAction {
	private readonly mode: number;

	/**
	 * Constructs a new {@code pushMode} action with the specified mode value.
	 * @param mode The mode value to pass to {@link Lexer#pushMode}.
	 */
	constructor(mode: number) {
		this.mode = mode;
	}

	/**
	 * Get the lexer mode this action should transition the lexer to.
	 *
	 * @return The lexer mode for this {@code pushMode} command.
	 */
	getMode(): number {
		return this.mode;
	}

	/**
	 * {@inheritDoc}
	 * @return This method returns {@link LexerActionType#PUSH_MODE}.
	 */
	@Override
	getActionType(): LexerActionType {
		return LexerActionType.PUSH_MODE;
	}

	/**
	 * {@inheritDoc}
	 * @return This method returns {@code false}.
	 */
	@Override
	isPositionDependent(): boolean {
		return false;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>This action is implemented by calling {@link Lexer#pushMode} with the
	 * value provided by {@link #getMode}.</p>
	 */
	@Override
	execute(@NotNull lexer: Lexer): void {
		lexer.pushMode(this.mode);
	}

	@Override
	hashCode(): number {
		let hash: number = MurmurHash.initialize();
		hash = MurmurHash.update(hash, this.getActionType());
		hash = MurmurHash.update(hash, this.mode);
		return MurmurHash.finish(hash, 2);
	}

	@Override
	equals(obj: any): boolean {
		if (obj === this) {
			return true;
		} else if (!(obj instanceof LexerPushModeAction)) {
			return false;
		}

		return this.mode === obj.mode;
	}

	@Override
	toString(): string {
		return `pushMode(${this.mode})`;
	}
}
