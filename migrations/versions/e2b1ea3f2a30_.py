"""empty message

Revision ID: e2b1ea3f2a30
Revises: cc169c24f6ba
Create Date: 2022-05-27 17:13:37.587431

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2b1ea3f2a30'
down_revision = 'cc169c24f6ba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quiz', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user', sa.String(length=25), nullable=False))
        batch_op.alter_column('miss',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('word_count',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('fk_quiz_user_id_user', type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quiz', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_quiz_user_id_user', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.alter_column('word_count',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('miss',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('user')

    # ### end Alembic commands ###
